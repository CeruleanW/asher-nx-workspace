import { sign } from 'jsonwebtoken';
import { configService } from '../../config/config.service';
const superagent = require('superagent');

const KEY_ID = 'L6UHA8ZQZA';
const TEAM_ID = 'HW348SJA68';
const APP_BUNDLE_ID = 'com.safetrack.kaiduMobileiOS';

const APPLE_APNS_AUTH_TOKEN_SIGNING_KEY = configService.getAppleAPNsSignKey();
const APPLE_APNS_BASE_URL = configService.getAppleAPNsUrl();

/**
 * @returns a new signed token for Apple APNs
 */
export function encryptAPNToken() {
  const jwt: string = sign(
    {
      iss: TEAM_ID,
    },
    APPLE_APNS_AUTH_TOKEN_SIGNING_KEY,
    {
      algorithm: 'ES256',
      keyid: KEY_ID,
      header: { typ: undefined },
    }
  );

  return jwt;
}

/**
 * send a Apple notification to kaiduMobileiOS App
 */
export function sendAppleNotificationToDevice(
  device_token: string,
  reqBody,
  auth_token,
  onError?: any,
  onFulfilled?: any
) {
  console.debug('sendAppleNotificationToDevice');
  const path = `/3/device/${device_token}`;
  const reqHeaders = {
    ':path': path,
    ':scheme': 'https',
    // ':authority': 'api.development.push.apple.com',
    authorization: `bearer ${auth_token}`,
    'apns-push-type': 'alert',
    'apns-priority': 5,
    'apns-topic': APP_BUNDLE_ID,
    'apns-expiration': 0,
  };

  const callback = (res) => {
    console.debug('Apple APN notification res: ', res);
    onFulfilled && onFulfilled(res);
  };

  const errorCallback = (error) => {
    // TODO: notify internal members
    // Send a slack message when a push request fails
    onError && onError(error);
  };

  superagent
    .post(APPLE_APNS_BASE_URL + path)
    .send(reqBody) // sends a JSON post body
    .set(reqHeaders)
    .http2()
    .then(callback)
    .catch(errorCallback);
}
