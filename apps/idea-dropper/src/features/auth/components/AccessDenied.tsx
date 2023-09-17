import {useEffect} from 'react';

export function AccessDenied() {

  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }, []);

  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a href="/">You will be redirected to the login page soon</a>
      </p>
    </>
  )
}
