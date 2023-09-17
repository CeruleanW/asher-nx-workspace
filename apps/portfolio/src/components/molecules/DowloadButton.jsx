import React from 'react';
import { Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export default function DowloadButton(props) {
  //A button with a download icon
  const { href } = props;
  return (
    <Button
      variant='contained'
      size='large'
      endIcon={<CloudDownloadIcon />}
      href={href}
      target='_blank'
      rel='noopener'
    >
      {props.children}
    </Button>
  );
}
