// import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
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
      <CircularProgress color='inherit' />
      <Typography className={classes.leftPadding}>{TEXT_MESSAGE}</Typography>
    </Backdrop>
  );
}
