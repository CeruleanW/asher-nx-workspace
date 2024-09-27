//@ts-nocheck
// import React from 'react';
import { Grid } from '@root/shared/components/atomics/Grid';
import { TextField } from '@root/shared/components/atomics/Input';
import { Button2 } from '@root/shared/components/atomics/Button';
import { useMedia } from 'react-use';
import styles from '../../styles/pages/Contact.module.scss';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { SimpleTextField } from './SimpleTextField';

export function ContactForm({ onSubmit, register }) {
  const isMobile = useMedia('(max-width: 600px)');

  return (
    <ErrorBoundary>
      <form onSubmit={onSubmit}>
        <Grid container justifyContent="center">
          <Grid container item spacing={isMobile ? 0 : 4}>
            <Grid item xs={12} sm={6}>
              <SimpleTextField
                label="Name"
                name={'name'}
                inputProps={{ ...register('name') }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SimpleTextField
                label="Email"
                inputProps={{ ...register('email') }}
                name={'email'} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={'Message'}
              name={'message'}
              variant="filled"
              margin="normal"
              required
              fullWidth
              color={'secondary'}
              multiline={true}
              minRows={5}
              inputProps={{ ...register('message') }} />
          </Grid>
        </Grid>
        <Button2
          className={`mt-2 ${styles.tooltip}`}
          variant="contained"
          color="primary"
          size="large"
          endIcon={''}
          target="_blank"
          rel="noopener"
          type="submit"
          onClick={onSubmit}
          href="#"
        >Send</Button2>
      </form>
    </ErrorBoundary>
  );
}
