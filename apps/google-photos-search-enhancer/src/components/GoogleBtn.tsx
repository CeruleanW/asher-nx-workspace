// import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { oauth2 } from '../features/g-api';
import { getTimeStamp, setUpdateTime, clearData, INDEXEDDB_LOCALMEDIAITEMS_KEY } from '../features/client-storage';
import { requestAllMediaItems } from '../features/g-api';
import { setAxiosDefaultAuthHeader } from '../features/request';
import { Button } from '@material-ui/core';
import { useAccessUpdate, useAccess } from './Context/AccessContext';
import { useFeedbackUpdate } from './Context/FeedbackContext';
import { useSWRConfig } from 'swr'

/**
 *
 */
export function GoogleBtn(props) {
  const { onSetLastUpdateTime, ...rest } = props;

  // Hooks
  const { mutate } = useSWRConfig();
  const updateBackdrop = useFeedbackUpdate().handleBackdrop;
  const updateTextMessage = useFeedbackUpdate().handleTextMessage;
  const updateIsLogined = useAccessUpdate().handleIsLogined;
  const isLogined = useAccess().isLogined;

  /**
   * get the access token from Google
   */
  const login = (response) => {
    const { accessToken } = response || {};
    if (accessToken) {
      console.debug('get login token: ', accessToken);
      updateIsLogined(true);
      setAxiosDefaultAuthHeader(accessToken);
      // start request
      updateMediaItemsInStorage();
    }
  };

  const logout = () => {
    updateIsLogined(false);

    // clear search results
    clearData();
    mutate(INDEXEDDB_LOCALMEDIAITEMS_KEY);
  };

  const handleLoginFailure = (response) => {
    console.error(response);
    alert('Failed to log in');
  };


  /**
   * should update the media items in local storage
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
    }
    updateBackdrop(false);
    updateTextMessage('');
  }

  return (
    <>
      {isLogined ? (
        <GoogleLogout
          clientId={oauth2.clientID}
          onLogoutSuccess={logout}
          buttonText='Logout'
          // onFailure={handleLogoutFailure}
          render={(renderProps) => (
            <Button
              variant='contained'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Logout
            </Button>
          )}
        // cookiePolicy={'single_host_origin'}
        />
      ) : (
        <GoogleLogin
          clientId={oauth2.clientID}
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy='single_host_origin'
          responseType='code,token'
          scope={oauth2.scopes[1]}
          isSignedIn={true}
          render={(renderProps) => (
            <Button
              variant='contained'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </Button>
          )}
        />
      )}
    </>
  );
}
