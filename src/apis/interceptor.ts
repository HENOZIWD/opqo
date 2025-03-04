import { CHANNEL_TOKEN } from '@/utils/constant';
import { getAuthSession } from '@/utils/storage';
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

      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (error.response && error.response.status === 403 && originalRequest._retryCount < 3) {
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

        originalRequest._retryCount += 1;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          const controller = new AbortController();

          axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/token`, {}, { signal: controller.signal })
            .then(({ data }) => {
              const token = data.accessToken;
              sessionStorage.setItem(CHANNEL_TOKEN, token);

              originalRequest.headers['Authorization'] = `Bearer ${token}`;

              processQueue(null, token);
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
    const { channelToken } = getAuthSession();

    if (channelToken) {
      config.headers['Authorization'] = `Bearer ${channelToken}`;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}
