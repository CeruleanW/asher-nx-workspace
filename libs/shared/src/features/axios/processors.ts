import axios, { AxiosResponse } from 'axios';

/**
 * @description set default axios header for all axios requests
 * @param  {string} token
 */
export function setAxiosDefault(token: string) {
  console.log(`setting axios default header with token: ${token}`);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.defaults.timeout = 40004;
}

export function getAxiosDefaultAuthHeader() {
  const result = axios?.defaults?.headers?.common['Authorization']
  // console.log(`Default axios auth header: ${result}`);
  return result;
}

export function addAxiosInterceptor(errorCallback: Function) {
  axios.interceptors.response.use(
    function (response) {
      // console.log(response.request._url);
      // console.log(response?.headers);
      // console.log(response?.request?._headers?.authorization);
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      errorCallback(error);
      return Promise.reject(error);
    }
  );
}

export function removeAxiosAuthHeader() {
  delete axios.defaults.headers.common['Authorization'];
}
