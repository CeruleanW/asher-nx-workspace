import { useEffectOnce } from 'react-use';
import { Button } from '../../../components/atomics/Button';
import styled from 'styled-components';
import { AppleLoginButton } from 'react-social-login-buttons'; //https://github.com/MichalSzorad/react-social-login-buttons#readme

declare const AppleID: {
  auth: any;
  [x: string]: any;
};

// Applied style from Apple recommendations https://developer.apple.com/documentation/sign_in_with_apple/displaying_sign_in_with_apple_buttons_on_the_web
const AppleLoginBtn = styled.div`
  width: 210px;
  height: 40px;
`;

function StyledAppleLoginBtn(props) {
  return (
    <AppleLoginBtn
      className={'mt-2'}
      id='appleid-signin'
      data-border='true'
      data-type='sign-in'
      {...props}
    >
      Sign in with Apple
    </AppleLoginBtn>
  );
}

export function AppleLogin({ initProps, ...optionals }) {
  useEffectOnce(() => {
    try {
      AppleID.auth.init(initProps);
    } catch (error) {
      console.error('failed to init AppleID auth', error);
    }
  });

  const handleClick = async () => {
    return await AppleID.auth.signIn();
  };

  return (
    <AppleLoginButton
      className={'mt-4'}
      onClick={handleClick}
      text={'Sign in with Apple'}
    />
  );
}

function BootstrapAppleLogin(props) {
  return (
    <Button className={'mt-2'} variant='dark' size='lg' {...props}>
      Sign in with Apple
    </Button>
  );
}
