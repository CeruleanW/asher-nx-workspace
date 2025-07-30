
function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import GoogleButton from 'react-google-button';

// import { CLIENT_ID } from 'features/auth';

// export function GoogleLoginBtn(props) {
//   return <GoogleLoginButton text={'Sign in with Google'} {...props} />;
// }

// export function ReactGoogleBtn(props) {
//   return <GoogleButton className='rounded-lg' {...props} />;
// }


// /**
//  * global variable from Google
//  */
// declare const google: {
//   accounts: any;
//   [x: string]: any;
// };


// export function GoogleLogin({ onError, }) {
//   // Hooks
//   const gbtn = useRef(null);

//   const handleGoogleResponse = (response) => {
//     console.log('handleGoogleResponse response', response)
//     const { credential, error } = response || {};

//     if (error) {
//       onError(
//         'Failed to login with Google. Please complete the Google login process to continue.'
//       );
//       return;
//     }

//   };

//   useEffect(() => {
//     console.debug('init Google auth');
//     google.accounts.id.initialize({
//       client_id: CLIENT_ID,
//       callback: handleGoogleResponse,
//     });
//     google.accounts.id.prompt();

//     google.accounts.id.renderButton(
//       gbtn.current,
//       { theme: "outline", size: "large", "width": 210 }  // customization attributes
//     );
//   }, [gbtn]);


//   return (<div ref={gbtn} className='w-full flex justify-center' id={'google-login-button-container'} ></div>);
// }
