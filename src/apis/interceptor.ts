import { getAccessToken, setAccessToken } from '@/utils/storage';
import axios, { AxiosInstance } from 'axios';

export function setTokenRefreshInterceptor(instance: AxiosInstance) {
  let isRefreshing = false;
  let failedQueue: {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    controller: AbortController;
  }[] = [];

  const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach(({
      resolve,
      reject,
      controller,
    }) => {
      if (!error) {
        resolve(token);
      }
      else {
        controller.abort();
        reject(error);
      }
    });

    failedQueue = [];
  };

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          const controller = new AbortController();

          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
              controller,
            });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;

              return instance(originalRequest);
            }).catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          const controller = new AbortController();

          axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/token`, {}, {
            withCredentials: true,
            signal: controller.signal,
          })
            .then(({ data }) => {
              const { accessToken } = data;
              setAccessToken(accessToken);

              originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

              processQueue(null, accessToken);
              resolve(instance(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .finally(() => { isRefreshing = false; });
        });
      }

      return Promise.reject(error);
    },
  );
}

export function setTokenInjectInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}
