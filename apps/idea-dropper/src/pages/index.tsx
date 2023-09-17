// import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { APPNAME } from '../lib/CONSTANTS';
import { Button } from '@root/shared/components/atomics';
import { useSession, signIn, signOut } from '../features/auth';
import { CenteredLoader } from '@root/shared/components/atomics';
import { useRouter } from 'next/router'

/**
 * App page, show login
 */
export default function Home() {
  // Hooks
  const { data: session } = useSession();
  const router = useRouter();

  // if (loading) {
  //   return <CenteredLoading />;
  // }

  if (session) {
    router.push('/main');
    return <p>Redirecting...</p>
  }

  return (
    <>
        <main className='max-w-full flex-auto flex flex-col justify-center'>
          <h1 className='title' data-cy='app-name' >{APPNAME}</h1>
          <div className='mt-10'>
            <p className='text-center'>Drop your ideas in the box</p>
            <p className='text-center'>Draw your ideas for inspiration </p>
          </div>
          <div className='mt-4 flex justify-center items-center gap-x-4'>
              <>
                <Button onClick={signIn}>Login</Button>
                <Link href='/signup' passHref>
                  <Button>Sign up</Button>
                </Link>
              </>
          </div>
        </main>
      <style jsx>{`
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .subtitle {
          font-size: 2rem;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        .logo {
          height: 1em;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
