import { useLocalStorage } from '../local-storage';
import { AUTH_KEY } from './constants';
import { checkIsTokenValid } from './processors';

/**
 *
 */
export function useAuthToken() {
  const [token, ...rest] = useLocalStorage(AUTH_KEY);
  const isTokenValid = checkIsTokenValid(token);
  return [token, isTokenValid, ...rest];
}
