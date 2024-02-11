//@ts-nocheck
// include a contact form and your social media channels.
import React, { useState } from 'react';
import { Box, Typography2, Loader, Modal, CenteredLoader } from '@root/shared/components/atomics';
import { EMAILAPIURL } from '../../features/notification';
import { makeStyles } from '@material-ui/core/styles';
import { SocialMedia } from '../../components/molecules/SocialMedia';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { usePersonalData } from '../../hooks';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { ContactForm } from './ContactForm';

const useStyles = makeStyles((theme) => {
  const py = theme.spacing(10);
  return {
    textArea: {
      // maxWidth: "90vw",
      width: '100%',
      fontSize: theme.spacing(2.1),
    },
    submit: {
      borderRadius: '0',
      marginTop: theme.spacing(1),
    },
    root: {
      padding: `${py}px ${theme.spacing(8)}px`,
      [theme.breakpoints.up('md')]: {
        padding: `${py}px ${theme.spacing(20)}px`,
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${py}px ${theme.spacing(30)}px`,
      },
    },
    spinner: {
      position: 'absolute',
      top: `50%`,
      left: `50%`,
      border: 'none',
    },
  };
});

function createRequestOption(data) {
  const myHeaders = createHeader();

  const raw = JSON.stringify({
    ...data,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    // mode: 'no-cors',
  };
  return requestOptions;
}

function createHeader() {
  let myHeaders = {};
  Object.assign(myHeaders, { 'Content-Type': 'application/json' });
  Object.assign(myHeaders, { 'Access-Control-Allow-Origin': '*' });
  return myHeaders;
}

export function Contact() {
  const { data, isLoading, error } = usePersonalData();
  const classes = useStyles();

  const [isReady, setIsReady] = useState(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setIsReady(false);
    console.log('submit data', data);
    //submit data to API for notification
    const requestOptions = createRequestOption(data) as any;
    console.log(requestOptions);
    fetch(EMAILAPIURL, requestOptions)
      .then((response) => response.text())
      .then(() => {
        alert('Success!');
        setIsReady(true);
      })
      .catch((error) => console.log('error:', error));
  };

  if (error) {
    return <div>Error! {error?.messsage}</div>;
  }

  if (isLoading) {
    return <CenteredLoader />;
  }

  return (
    <ErrorBoundary>
      <Box maxWidth={1280} className={classes.root}>
        <Typography2 variant={'h2'} component={'p'}>
          Get in touch?
        </Typography2>
        <Typography2 variant={'h2'} component={'p'}>
          Drop me a line!
        </Typography2>
        <Box mt={1}>
          <Typography2>
            Are you looking for a developer, or just want to talk? Please feel
            to contact me. free.
          </Typography2>
        </Box>
        <Box maxWidth={850} mt={4}>
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            <ContactForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
            />
          </motion.div>
        </Box>
        <Box mt={18} width={120}>
          <SocialMedia text={''} email={data?.resume?.email} />
        </Box>
        <Modal
          open={!isReady}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableEnforceFocus
        >
          <Loader className={classes.spinner} />
        </Modal>
      </Box>
    </ErrorBoundary>
  );
}

export default Contact;
