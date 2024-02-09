export const GOOGLE_PHOTOS_API = 'https://photoslibrary.googleapis.com/v1';
export const MEDIA_ITEMS_API = `${GOOGLE_PHOTOS_API}/mediaItems`;
export const MEDIA_ITEMS_SEARCH_API = `${MEDIA_ITEMS_API}:search`;

export const CREDENTIALS = {
  "web": {
    "client_id": "8971658186-mo4gk8aa24n80ebqah9bk7dukraegju4.apps.googleusercontent.com",
    "project_id": "integrated-oath-309216",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
  }
}


export const OAUTH2 = {
  clientID: CREDENTIALS.web.client_id,
  projectId: CREDENTIALS.web.project_id,
  authUri: CREDENTIALS.web.auth_uri,
  tokenUri: CREDENTIALS.web.token_uri,
  scopes: [
    'https://www.googleapis.com/auth/photoslibrary',
    'https://www.googleapis.com/auth/photoslibrary.readonly',
  ],
};
