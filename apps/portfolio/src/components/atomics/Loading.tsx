import React from 'react';
import { makeStyles  } from "@material-ui/core/styles";
import { Loader } from '@root/shared/components/atomics/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Loader />
    </div>
  );
}
