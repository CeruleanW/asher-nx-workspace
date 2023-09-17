import { GoogleLoginButton } from 'react-social-login-buttons'; //https://github.com/MichalSzorad/react-social-login-buttons#readme

function StyledGoogleLoginButton(props) {
  return <GoogleLoginButton text={'Sign in with Google'} style={{ backgroundColor: '#4285f4', height: '40px', color: 'white', fontSize: '18px', fontWeight: 'light' }} activeStyle={{}} {...props} />
}

export function GoogleLogin(props) {
  return (
    <GoogleLoginButton text={'Sign in with Google'}  {...props} />
  )
}
