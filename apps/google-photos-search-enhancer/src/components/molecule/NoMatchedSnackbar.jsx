// import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useFeedback, useFeedbackUpdate } from '../Context/FeedbackContext';
import { Alert } from '@root/shared/components/atomics/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '15px',
  },
}));

/**
 * Warning for nothing matched
 */
export function NoMatchedSnackbar(props) {
  const classes = useStyles();

  const isNoMatch = useFeedback().isNoMatch;
  const updateIsNoMatch = useFeedbackUpdate().handleIsNoMatch;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      updateIsNoMatch(false);
      return;
    }
    updateIsNoMatch(false);
  };

  function NotFoundAlert(props) {
    return (
      <Alert elevation={6} variant="filled" onClick={handleClose} {...props}>
        Not Found
      </Alert>
    );
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        open={isNoMatch}
        autoHideDuration={5000}
        onClose={handleClose}
        className={classes.root}
      >
        <NotFoundAlert severity="warning"></NotFoundAlert>
      </Snackbar>
    </div>
  );
}

export default NoMatchedSnackbar
