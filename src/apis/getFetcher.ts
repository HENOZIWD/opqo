import { accessTokenToBearer } from '@/utils/token';
import { fetchInstance } from './instance';

export const getFetcher = (url: string) => fetchInstance.get(url).then((res) => res.data);

interface GetFetcherWithCredentialsParams {
  url: string;
  accessToken: string | null;
}

export const getFetcherWithCredentials = ({
  url,
  accessToken,
}: GetFetcherWithCredentialsParams) => fetchInstance.get(url, {
  headers:
    { Authorization: accessTokenToBearer(accessToken) },
}).then((res) => res.data);
