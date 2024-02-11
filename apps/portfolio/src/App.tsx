//@ts-nocheck
import { LinearProgress } from '@root/shared/components/atomics/Loading';
import LogRocket from 'logrocket';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/atomics/ScrollToTop';
import Footer from './components/organisms/Footer/Footer';
import NavTabs from './components/molecules/NavTabs';
import Nav from './components/organisms/Nav';
import { STATEMENT } from './lib/constants';
import { PAGE_ROUTES, PAGE_TITLES } from './routes';
import { easterEgg } from './lib/easter-egg';
import './styles/main.scss';
import { MainRoutesGroup } from './routes/MainRoutesGroup';
import { ProviderGroup } from './providers';

LogRocket.init('5bsway/portfolio');


function NavRouter() {
  const location = useLocation();
  return <NavTabs
    routes={PAGE_ROUTES}
    value={location.pathname}
    labels={PAGE_TITLES}
  />

}


export default function App() {
  useEffect(() => {
    easterEgg();
    console.log(STATEMENT);
    console.log(`Env: ${process.env.NODE_ENV}`);
  }, []);


  return (
    <ProviderGroup>
      <BrowserRouter>
        <div className={'root-container'}>
          <Nav routes={PAGE_ROUTES} pageTitles={PAGE_TITLES}>
            <NavRouter />

            {/* <Routes>
              <Route
                path="/"
                children={({ location }) => (
                  <NavTabs
                    routes={PAGE_ROUTES}
                    value={location.pathname}
                    labels={PAGE_TITLES}
                  />
                )}
              />
            </Routes> */}
          </Nav>
          <React.Suspense fallback={<LinearProgress color={'secondary'} />}>
            <main className={'root-main'}>
              <MainRoutesGroup />
            </main>
            <Footer />
            <ScrollToTop />
          </React.Suspense>
        </div>
      </BrowserRouter>
    </ProviderGroup>
  );
}
