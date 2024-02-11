//@ts-nocheck
import React from 'react';
import { Box } from '@root/shared/components/atomics';
import { motion } from 'framer-motion';
import Description from '../components/molecules/Description';
import MyStory from '../components/organisms/MyStory';
import MySkills from '../components/organisms/SkillsGroup';
import { FULLNAME } from '../lib/constants';
import styles from '../styles/pages/AboutMe.module.scss';
import { H1 } from '../../../../libs/shared/src/components/atomics/Heading';

function MyImage() {
  return (
    <img
      src={'/img/about-me-profile.jpg'}
      alt={`Profile of ${FULLNAME}`}
      className={styles['img-fit']}
    />
  );
}

const variants = {
  animate: { opacity: 1, x: 0 },
  right: { opacity: 0, x: 1000 },
  left: { opacity: 0, x: -1000 },
};

export default function AboutMe() {
  return (
    <>
      <div className='flex max-w-screen-xl flex-col lg:ml-10 xl:m-auto'>
        <motion.div
          initial='left'
          animate='animate'
          variants={variants}
          transition={{ duration: 1 }}
          className={`flex flex-grow mt-8 mr-9 text-justify lg:mt-24 lg:mb-6`}
        >
          <div className='w-9' style={{ backgroundColor: '#5f9ea085' }}></div>
          <div className='flex-grow pl-3'>
            <Description>HEY THERE!</Description>
            <H1>I'm {FULLNAME}</H1>
            <Box mt={2}>
              <Description>
                Let me express myself a little. Please have a seat. I'll try to
                make it not so boring.
              </Description>
            </Box>
          </div>
        </motion.div>
        <div className='p-9 lg:pl-0'>
          <div className={`flex flex-col lg:flex-row`}>
            <div className={'min-w-min flex-shrink-0'}>
              <MyImage />
            </div>
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className={`h-full flex-grow-0 max-w-prose pt-5 lg:ml-20 lg:max-w-max ${styles.section}`}
            >
              <MyStory />
            </motion.section>
          </div>
          <section className={`flex-col mt-10 ${styles.section}`}>
            <MySkills />
          </section>
        </div>
      </div>
    </>
  );
}
