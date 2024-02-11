//@ts-nocheck
import { Box } from '@root/shared/components/atomics/Container';
import { Typography2 } from '@root/shared/components/atomics/Typography';
import { motion } from 'framer-motion';
import { FULLNAME, JOBTITLE } from '../../lib/constants';
import { useStyles } from '../Home';


export function Header() {
  const classes = useStyles();

  return (
    <>
      <Typography2 variant='h1' component='h1'>
        Hi! <span>I'm</span> {FULLNAME}
      </Typography2>
      <Box width={'fit-content'}>
        <h1>
          <span className={`${classes.halfBackground} text-4xl`}>
            {JOBTITLE}
          </span>
        </h1>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Typography2 variant='subtitle1'>
            coding at Toronto, Canada.
          </Typography2>
        </motion.div>
      </Box>
    </>
  );
}
