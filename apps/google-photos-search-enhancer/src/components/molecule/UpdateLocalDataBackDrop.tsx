// import React from 'react';
import { Backdrop } from '@root/shared/components/atomics/Backdrop';
import { Loader } from '@root/shared/components/atomics/Loading';
import { Typography2 } from '@root/shared/components/atomics/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { selectIsUpdateModalShown } from '../../providers/redux/globalSlice';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  leftPadding: {
    paddingLeft: '15px',
  }
}));

const TEXT_MESSAGE = 'Updating local data... Please wait for a while';

/**
 * Loader
 */
export function UpdateLocalDataBackDrop() {
  const classes = useStyles();
  const isBackdropOpened = useSelector(selectIsUpdateModalShown);

  return (
    <Backdrop className={classes.backdrop} open={isBackdropOpened}>
      <Loader color='inherit' />
      <Typography2 className={classes.leftPadding}>{TEXT_MESSAGE}</Typography2>
    </Backdrop>
  );
}
