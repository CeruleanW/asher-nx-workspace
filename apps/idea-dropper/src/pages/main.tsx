import { Protected } from '../features/auth/components/Protected';
import { MainPage } from './MainPage';

/**
 * should show all the boxes of current user
 */
export default function Main() {

  return (
    <Protected>
      <MainPage />
    </Protected>
  )
}
