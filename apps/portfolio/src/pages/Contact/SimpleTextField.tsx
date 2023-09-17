import React from 'react';
import { TextField } from '@material-ui/core';

export const SimpleTextField = (props) => {
  const { label, name, ...rest } = props;

  return (
    <TextField
      label={label}
      variant="filled"
      margin="normal"
      required
      fullWidth
      color={'secondary'}
      name={name}
      {...rest} />
  );
};
