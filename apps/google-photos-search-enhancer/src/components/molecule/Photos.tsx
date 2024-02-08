import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Skeleton from '@mui/material/Skeleton';
import { PhotoList } from './PhotoList';
import { CenterBackground } from '../molecule/CenterBackground';
import { isFilledArray } from '@root/shared/utils';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    marginTop: '10px',
    marginLeft: '10px',
  },
  gridListTile: {
    maxWidth: 480,
    maxHeight: 360,
  },
  image: {
    maxWidth: '100%',
    '&:hover': {
      opacity: 0.5,
    },
  },
  masonryGrid: {
    display: 'flex',
    marginLeft: '-30px' /* gutter size offset */,
    width: '100%',
  },
  masonryGridColumn: {
    paddingLeft: '20px' /* gutter size */,
    backgroundClip: 'padding-box',
    /* change div to reference your elements you put in <Masonry> */
    '& > div': {
      marginBottom: '30px',
    },
  },
}));

/**
 *
 */
export function PhotosContainer(props) {
  const { list, ...rest } = props;

  // Style
  const classes = useStyles();

  // States
  const displayedPhotos = list;


  if (!isFilledArray(displayedPhotos)) {
    return <CenterBackground />
  }

  return (
    <div className={classes.root}>
      <PhotoList photoUrls={displayedPhotos} {...props} />
      {/* {loadingPhotos ? (
        <Grid container spacing={1}>
          {displayedPhotos?.map((photoItem, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={`$photo-skeleton-${index}`}
            >
              <Skeleton variant='rectangular' height={300} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <PhotoList photoUrls={displayedPhotos} {...props} />
      )} */}
    </div>
  );
}
