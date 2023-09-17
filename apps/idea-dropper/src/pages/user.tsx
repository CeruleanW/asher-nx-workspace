import { useSession } from '@idea/features/auth';
import React from 'react';
import { CenteredLoader } from '@root/shared/components/atomics';
import { UserProfile } from '../components/molecule/UserProfile';
import { HomeBtn } from '../components/molecule/HomeBtn';

/**
 *
 */
export default function User() {
  const { data: session } = useSession();
  const { user } = session || {};

  // if (loading) {
  //   return <CenteredLoading />;
  // }

  // console.debug('session', session);
  return (
    <div className={'p-4'}>
      <UserProfile user={user} />
      <div className='mt-2'>
        <HomeBtn />
      </div>
    </div>
  );
}
