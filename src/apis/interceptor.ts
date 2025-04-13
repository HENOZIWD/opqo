import { setAccessTokenCookie } from '@/serverActions/token';
import { parseJwt } from '@/utils/token';
import axios, { AxiosInstance } from 'axios';

export function setTokenRefreshInterceptor(instance: AxiosInstance) {
  let isRefreshing = false;
  let failedQueue: {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }[] = [];

  const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach(({
      resolve,
      reject,
    }) => {
      if (!error) {
        resolve(token);
      }
      else {
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

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          axios.post<{ accessToken: string }>(`${process.env.NEXT_PUBLIC_SERVER_URL}/token/refresh`, undefined, { withCredentials: true })
            .then(async ({ data }) => {
              const { accessToken } = data;

              const decodedToken = parseJwt(accessToken);

              if (!decodedToken) {
                processQueue(new Error('Invalid Token'), null);
                return reject(new Error('Invalid Token'));
              }

              await setAccessTokenCookie({
                accessToken,
                expUnixTimeStamp: decodedToken.exp,
              });

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
