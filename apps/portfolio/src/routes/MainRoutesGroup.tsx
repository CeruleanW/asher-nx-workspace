//@ts-nocheck
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '../pages/Home';
import { ProjectDetailPage } from '../pages/ProjectDetail';
import { Projects } from '../pages/Projects';
import { Resume } from '../pages/Resume';
import { PAGE_ROUTES } from './constants';
import { lazy } from 'react';
import { Contact } from '../pages/Contact';

const AboutMe = lazy(() => import('../pages/AboutMe'));

export function MainRoutesGroup() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes key={location.pathname}>
        <Route
          path={PAGE_ROUTES[0]}
          element={<Home />}
        />
        <Route
          path={`${PAGE_ROUTES[1]}/:id`}
          element={<ProjectDetailPage />}
        />
        <Route
          path={PAGE_ROUTES[1]}
          element={<Projects />}
        />
        <Route
          path={PAGE_ROUTES[2]}
          element={<AboutMe />}
        />
        <Route
          path={PAGE_ROUTES[3]}
          element={<Contact />}
        />
        <Route
          path={PAGE_ROUTES[4]}
          element={<Resume />}
        />
      </Routes>
    </AnimatePresence>
  )


  // return (
  //   <Routes>
  //     <Route
  //       element={({ location }) => (
  //         <AnimatePresence exitBeforeEnter initial={false}>
  //           <Routes key={location.pathname}>
  //             <Route
  //               path={PAGE_ROUTES[0]}
  //               element={() => <Home />}
  //             />
  //             <Route
  //               path={`${PAGE_ROUTES[1]}/:id`}
  //               element={() => <ProjectDetailPage />}
  //             />
  //             <Route
  //               path={PAGE_ROUTES[1]}
  //               element={() => <Projects />}
  //             />
  //             <Route
  //               path={PAGE_ROUTES[2]}
  //               element={() => <AboutMe />}
  //             />
  //             <Route
  //               path={PAGE_ROUTES[3]}
  //               element={() => <Contact />}
  //             />
  //             <Route
  //               path={PAGE_ROUTES[4]}
  //               element={() => <Resume />}
  //             />
  //           </Routes>
  //         </AnimatePresence>
  //       )}
  //     />
  //   </Routes>
  // )
}
