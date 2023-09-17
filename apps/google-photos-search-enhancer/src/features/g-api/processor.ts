// https://developers.google.com/photos/library/guides/access-media-items
// https://developers.google.com/photos/library/reference/rest/v1/mediaItems/search
import { LocalMediaItem } from './types';
// import {google} from 'googleapis';

export function extractPropsInMediaItems(responseJson): LocalMediaItem[] {
  const mediaItems = responseJson.mediaItems;
  return mediaItems
    ? responseJson.mediaItems.map((mediaItem) => {
        const { id, productUrl, filename, description } = mediaItem;
        return { id, productUrl, filename, description };
      })
    : null;
}


// export function initGoogle() {
//   google.client.init({
//     'apiKey': 'YOUR_API_KEY',
//     // clientId and scope are optional if auth is not required.
//     'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
//     'scope': 'profile',
//   })
// }
