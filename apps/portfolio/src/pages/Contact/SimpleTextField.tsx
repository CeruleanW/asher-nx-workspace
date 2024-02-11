import React from 'react';
import { TextField } from '@root/shared/components/atomics/Input';

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
