//@ts-nocheck
import Image from 'material-ui-image';
import DotBox from '../../components/atomics/DotBox';
import { motion } from 'framer-motion';
import { FULLNAME } from '../../lib/constants';
import { mainPhoto } from './constants';
import { variants } from './index';

export function ProfileImg() {
  return (<motion.div initial='right' animate='animate' variants={variants} transition={{
    duration: 0.8
  }}>
    <Image src={mainPhoto} alt={`${FULLNAME}'s profile`} imageStyle={{
      width: '100%',
      zIndex: '1'
    }} aspectRatio={0.75} disableTransition />
    <DotBox />
  </motion.div>);
}
