import { setAccessTokenCookie } from '@/serverActions/token';
import { parseJwt } from '@/utils/token';
import ky, { KyRequest, KyResponse, NormalizedOptions } from 'ky';

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

export const tokenRefreshInterceptor = async (
  request: KyRequest,
  options: NormalizedOptions,
  response: KyResponse,
): Promise<Response> => {
  if (response.status !== 401 || request.headers.get('x-retry') === 'true') {
    return response;
  }

  const originalRequest = request.clone();

  if (isRefreshing) {
    return new Promise<Response>((resolve, reject) => {
      failedQueue.push({
        resolve: (token) => {
          const newRequest = new Request(originalRequest, {
            headers: {
              ...Object.fromEntries(originalRequest.headers.entries()),
              'Authorization': `Bearer ${token}`,
              'x-retry': '1',
            },
          });

          resolve(ky(newRequest, options));
        },
        reject,
      });
    });
  }

  isRefreshing = true;

  try {
    const { accessToken } = await ky.post<{ accessToken: string }>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/token/refresh`,
      { credentials: 'include' },
    ).json();

    const decodedToken = parseJwt(accessToken);

    if (!decodedToken) {
      processQueue(new Error('Invalid Token'), null);
      throw new Error('Invalid Token');
    }

    await setAccessTokenCookie({
      accessToken,
      expUnixTimeStamp: decodedToken.exp,
    });

    processQueue(null, accessToken);

    const retryRequest = new Request(originalRequest, {
      headers: {
        ...Object.fromEntries(originalRequest.headers.entries()),
        'Authorization': `Bearer ${accessToken}`,
        'x-retry': '1',
      },
    });

    return ky(retryRequest, options);
  }
  catch (error) {
    processQueue(error, null);

    throw error;
  }
  finally {
    isRefreshing = false;
  }
};
