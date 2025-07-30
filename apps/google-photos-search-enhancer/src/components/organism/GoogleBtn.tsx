//@ts-nocheck
import { OAUTH2 } from '../../features/g-api';
import { getTimeStamp, setUpdateTime, clearData, INDEXEDDB_LOCALMEDIAITEMS_KEY } from '../../features/client-storage';
import { requestAllMediaItems } from '../../features/g-api';
import { setAxiosDefaultAuthHeader, sendPost } from '../../features/request';
import { Button } from '@root/shared/components/atomics/Button';
import { useFeedbackUpdate } from '../Context/FeedbackContext';
import { useSWRConfig } from 'swr';
import { useGoogleAuthToken } from '@root/shared/domain/auth';
import { useGoogleAuth, useGoogleUser } from '@root/shared/features/google-api';

/**
 *
 */
export function GoogleBtn(props) {
  const { onSetLastUpdateTime, ...rest } = props;
  const [token, isTokenValid, setToken, remove] = useGoogleAuthToken();

  // Hooks
  const { mutate } = useSWRConfig();
  const { googleAuth } = useGoogleAuth();
  const { currentUser } = useGoogleUser();
  const updateBackdrop = useFeedbackUpdate().handleBackdrop;
  const updateTextMessage = useFeedbackUpdate().handleTextMessage;

  /**
   * get the access token from Google
   */
  const login = async () => {
    const user = await googleAuth.signIn();
    console.log("login ~ user:", user)
    const accessToken = user.Kc.access_token;
    const tokenObj = user.Kc;
    if (accessToken && tokenObj) {
      console.debug('get login token: ', tokenObj);
      setAxiosDefaultAuthHeader(accessToken);
      setToken(tokenObj);
      // start request
      await updateMediaItemsInStorage();
    }
  };

  const logout = () => {
    googleAuth.signOut()
    //updateIsLogined(false);
    remove();

    // clear search results
    clearData();
    mutate(INDEXEDDB_LOCALMEDIAITEMS_KEY);
  };

  const handleLoginFailure = (response) => {
    console.error(response);
    alert('Failed to log in');
  };


  /**
   * should update the media items to client storage
   */
  async function updateMediaItemsInStorage(): Promise<void> {
    console.log('fetchMediaItems is called');
    try {
      // If it's the first time that the user login
      if (!getTimeStamp()) {
        updateTextMessage(
          'Initializing Local Data Storage. This may take long time depends the quantity of media items in your library'
        );
        updateBackdrop(true);
        await requestAllMediaItems().finally(() => {
          updateBackdrop(false);
          updateTextMessage('');
        });

        onSetLastUpdateTime();
      } else {
        //TODO: get new items since last update
        await requestAllMediaItems().finally(() => {
          updateBackdrop(false);
          updateTextMessage('');
        });
        setUpdateTime();
        onSetLastUpdateTime();
      }
    } catch (error) {
      console.error(error?.messsage);
    } finally {
      updateBackdrop(false);
      updateTextMessage('');
    }
  }

  if (!isTokenValid) {
    return (
      <>
        <Button
            variant='contained'
            onClick={login}
          >
            Login
          </Button>
      </>
    )
  }

  console.log("Current user: ", currentUser)
  return <Button
              variant='contained'
              onClick={logout}
            >
              Logout
            </Button>


  // return (
  //   <>
  //     {isTokenValid ? (
  //       <GoogleLogout
  //         clientId={OAUTH2.clientID}
  //         onLogoutSuccess={logout}
  //         buttonText='Logout'
  //         // onFailure={handleLogoutFailure}
  //         render={(renderProps) => (
  //           <Button
  //             variant='contained'
  //             onClick={renderProps.onClick}
  //             disabled={renderProps.disabled}
  //           >
  //             Logout
  //           </Button>
  //         )}
  //       // cookiePolicy={'single_host_origin'}
  //       />
  //     ) : (
  //       <GoogleLogin
  //         clientId={OAUTH2.clientID}
  //         onSuccess={login}
  //         onFailure={handleLoginFailure}
  //         cookiePolicy='single_host_origin'
  //         responseType='code,token'
  //         scope={OAUTH2.scopes[1]}
  //         isSignedIn={isTokenValid}
  //         render={(renderProps) => (
  //           <Button
  //             variant='contained'
  //             onClick={renderProps.onClick}
  //             disabled={renderProps.disabled}
  //           >
  //             Login
  //           </Button>
  //         )}
  //       />
  //     )}
  //   </>
  // );
}
