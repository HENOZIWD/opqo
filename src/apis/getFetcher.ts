import { fetchInstance, fetchInstanceWithCredentials } from './instance';

export const getFetcher = (url: string) => fetchInstance.get(url).then((res) => res.data);
export const getFetcherWithCredentials = (url: string) => fetchInstanceWithCredentials.get(url).then((res) => res.data);
