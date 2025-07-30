import {useLocalStorage} from '../../features/local-storage';
import { checkIsGoogleTokenObjValid, AUTH_KEY } from '../../features/auth';

/**
 *
 */
export function useGoogleAuthToken() {
  const [value, ...rest] = useLocalStorage(AUTH_KEY);

  const isTokenValid  = checkIsGoogleTokenObjValid(value);
  // console.log("useGoogleAuthToken ~ isTokenValid:", isTokenValid)
  const token = value?.access_token;
  return [token, isTokenValid, ...rest]
}
