import { getNow } from '../date';
import { AUTH_KEY } from './constants';
import jwt_decode from 'jwt-decode';
import { JWT } from './types';
import { setToLocalStorage, getLocalStorage } from '../local-storage';
import { removeAxiosAuthHeader } from '../axios';

export function isTokenExpired(exp: number): boolean {
  const now = Math.floor(getNow().getTime() / 1000);
  const result = exp < now;
  result && console.warn('Token expired!', exp, now);
  return result;
}

export function setTokenToLocalStorage(token: string) {
  return setToLocalStorage(AUTH_KEY, {
    token,
  });
}

export function getAuthTokenFromLocalStorage(): string {
  //@ts-ignore
  const { token } = getLocalStorage(AUTH_KEY) || {token: undefined};
  return token;
}

export function getDecodeAuthTokenFromLocalStorage() {
  const token = getAuthTokenFromLocalStorage();
  // console.debug('getDecodeAuthTokenFromLocalStorage', token);
  const tokenObj: JWT = jwt_decode(token);
  return tokenObj;
}

export function clearAuthTokenInLocalStorage(): void {
  setTokenToLocalStorage(null);
}

export function checkIsTokenValid(token: string): boolean {
  try {
    const tokenObj: any = jwt_decode(token);
    const { exp } = tokenObj || { exp: true };
    return exp && !isTokenExpired(exp);
  } catch (error) {
    console.warn('checkIsTokenValid gets error', error);
    return false;
  }
}

export function checkIsAuthInLocalStorageValid(): boolean {
  const token = getAuthTokenFromLocalStorage();
  return checkIsTokenValid(token);
}

export function logout() {
  clearAuthTokenInLocalStorage();
  sessionStorage.clear();
  removeAxiosAuthHeader();
}
