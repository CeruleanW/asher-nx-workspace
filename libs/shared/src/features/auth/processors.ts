import { getNow } from '../date';
import { AUTH_KEY } from './constants';
import jwt_decode from 'jwt-decode';
import { JWT } from './types';
import { setToLocalStorage, getLocalStorage } from '../local-storage';
import { removeAxiosAuthHeader } from '../axios';

export function isUnixTimeBeforeNow(exp: number): boolean {
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

/**
 * return true if the JWT token string is valid and not expired
 */
export function checkIsTokenValid(token: string): boolean {
  try {
    const tokenObj: any = jwt_decode(token);
    const { exp } = tokenObj || { exp: true };
    return exp && !isUnixTimeBeforeNow(exp);
  } catch (error) {
    console.warn('checkIsTokenValid gets error', error);
    return false;
  }
}

/**
 * return true if the JWT token string is valid and not expired
 */
export function checkIsGoogleTokenObjValid(tokenObj: any): boolean {
  try {
    const { expires_at, access_token, token_type } = tokenObj || { exp: true };
    const result = access_token && !isUnixTimeBeforeNow(expires_at)
    // console.log("checkIsGoogleTokenObjValid ~ access_token:", access_token)
    return result;
  } catch (error) {
    console.warn('checkIsGoogleTokenObjValid gets error', error);
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
