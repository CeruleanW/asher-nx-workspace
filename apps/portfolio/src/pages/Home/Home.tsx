//@ts-nocheck
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SeeMyProject from '../../components/molecules/More';
import { ProjectsCarousel } from '../../components/organisms/ProjectsCarousel';
import { motion } from 'framer-motion';
import styles from '../../styles/pages/Home.module.scss';
import { Header } from './Header';
import { ProfileImg } from './ProfileImg';
import { HeroImg } from './HeroImg';


export const useStyles = makeStyles((theme) => ({
  maincontent: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(13),
      paddingRight: theme.spacing(17),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  noWidthOverflow: {
    maxWidth: '100%',
  },
  halfBackground: {
    background: `linear-gradient(to top, ${theme.palette.secondary.light} 50%, transparent 50%)`,
  },
}));

//Styles
export const variants = {
  animate: { opacity: 1, x: 0 },
  right: { opacity: 0, x: 1000 },
  left: { opacity: 0, x: -1000 },
};

export function Home() {

  return (
    <>
      <section data-cy={'home-hero-section'}>
        <HeroImg/>
      </section>
      <section className={styles['container']} data-cy={'home-content-section'}>
        <div className={styles['left']}>
          <Header />
          <motion.div
            initial='left'
            animate='animate'
            variants={variants}
            transition={{ duration: 0.8 }}
          >
            <div className={styles['leftBottom']}>
              <SeeMyProject height={40} />
            </div>
            <Box mt={3}>
              <ProjectsCarousel />
            </Box>
          </motion.div>
        </div>
        <div className={styles['right']}>
          <ProfileImg />
        </div>
      </section>
    </>
  );
}


