import axios, { AxiosInstance } from 'axios';
import { CHANNEL_TOKEN } from './constant';

export function setTokenRefreshInterceptor(instance: AxiosInstance) {
  let isRefreshing = false;
  let failedQueue: {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }[] = [];

  const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach((fq) => {
      if (!error) {
        fq.resolve(token);
      }
      else {
        fq.reject(token);
      }
    });

    failedQueue = [];
  };

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (error.response.status === 401 && originalRequest._retryCount < 3) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
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
          axios.post('/mockApi/refresh')
            .then(({ data }) => {
              const token = data.channelToken;
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
