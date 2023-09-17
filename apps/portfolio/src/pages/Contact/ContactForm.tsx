// import React from 'react';
import {
  Button,
  Grid,
  TextField,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import styles from '../../styles/pages/Contact.module.scss';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { SimpleTextField } from './SimpleTextField';

export function ContactForm({ onSubmit, register }) {
  const theme = useTheme() as any;
  const isMobile = useMediaQuery(theme?.breakpoints?.down('xs'), {
    defaultMatches: true,
  });

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
        <Button
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
        >
          <span className={''}>Send</span>
        </Button>
      </form>
    </ErrorBoundary>
  );
}
