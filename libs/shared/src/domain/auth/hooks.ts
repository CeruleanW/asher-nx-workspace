import {useLocalStorage} from '../../features/local-storage';
import { checkIsGoogleTokenObjValid, AUTH_KEY } from '../../features/auth';

/**
 *
 */
export function useGoogleAuthToken() {
  const [value, ...rest] = useLocalStorage(AUTH_KEY);

  const isTokenValid  = checkIsGoogleTokenObjValid(value);
  const token = value?.accessToken;
  return [token, isTokenValid, ...rest]
}
