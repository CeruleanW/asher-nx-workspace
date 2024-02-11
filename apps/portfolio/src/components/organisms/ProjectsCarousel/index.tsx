//@ts-nocheck
import React from 'react';
import { Box, Grid } from '@root/shared/components/atomics';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { makeStyles } from '@material-ui/core/styles';
import CustomCard from '../../molecules/CustomCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './ProjectsCarousel.css';
import { Loading } from '../../atomics/Loading';
import { useProjectsData } from '../../../hooks';

const SLIDE_NUMBER = 5;

const useStyles = makeStyles((theme) => ({
  slider: {
    borderRadius: theme.spacing(2),
  },
  button: {
    borderRadius: '50%',
    borderColor: '#7e7e7e4f',
    borderWidth: '1px',
    width: theme.spacing(5),
    height: theme.spacing(5),
    '&:focus': {
      outlineColor: '#7e7e7e4f',
    },
  },
}));

export function ProjectsCarousel({ ...optionals }) {
  const classes = useStyles();

  const { projectData, isLoading, error } = useProjectsData();

  if (error) {
    return <div>Error! {error?.messsage}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  // if (!data) {
  //   return null;
  // }

  const projectList = projectData?.projects?.slice(0, SLIDE_NUMBER);

  return (
    <Box mx={'auto'} maxWidth={580}>
      <CarouselProvider
        naturalSlideWidth={80}
        naturalSlideHeight={70}
        totalSlides={projectList.length}
        infinite={true}
        isPlaying
      >
        <Grid container alignItems={'center'} spacing={1} justifyContent={'center'}>
          <Grid container item xs={1} justifyContent={'center'}>
            <ButtonBack className={classes.button}>
              <ArrowBackIcon />
            </ButtonBack>
          </Grid>
          <Grid item xs={10}>
            <Slider className={classes.slider}>
              {projectList.map((project, index) => (
                <Slide key={'slide-' + index} index={index}>
                  <CustomCard
                    key={'card-' + index}
                    {...project}
                    image={project.image}
                  />
                </Slide>
              ))}
            </Slider>
          </Grid>

          <Grid container item xs={1} justifyContent={'center'}>
            <ButtonNext className={classes.button}>
              <ArrowForwardIcon />
            </ButtonNext>
          </Grid>
          <Grid item xs={1} />
          <Grid container item xs={10} justifyContent={'center'}>
            {projectList.map((project, index) => (
              <Dot slide={index} key={'dot-' + index} />
            ))}
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </CarouselProvider>
    </Box>
  );
}
