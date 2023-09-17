import { handle } from '../../utils';
import axios, { AxiosRequestConfig } from 'axios';

/**
 *
 */
export async function fetchAsArrayBuffer(
  url: string,
  config?: object
): Promise<ArrayBuffer> {
  console.log(`fetchAsArrayBuffer called with input: ${url}`);
  let mergedConfig: AxiosRequestConfig = { responseType: 'arraybuffer' };
  if (config) {
    mergedConfig = Object.assign(mergedConfig, config);
  }

  const [result, resultErr] = await handle(axios.get(url, mergedConfig));

  if (!result) {
    console.error(`fetchAsArrayBuffer failed`);
    throw resultErr;
  }

  return result?.data;
}

/**
 * basic fetcher
 * @returns the data of response
 */
export function getData(url: string, config?: any) {
  return axios.get(url, config).then((res) => res?.data);
}

export function post(url: string, data?: any, config?: any) {
  return axios.post(url, data, config).then((res) => res?.data);
}

export function put(url: string, data?: any, config?: any) {
  return axios.put(url, data, config).then((res) => res?.data);
}

export function patch(url: string, data?: any, config?: any) {
  return axios.patch(url, data, config).then((res) => res?.data);
}

export function del(url: string, config?: any) {
  return axios.delete(url, config).then((res) => res?.data);
}
