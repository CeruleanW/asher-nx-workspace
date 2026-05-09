import React from 'react';
import {
  Box,
  Typography2,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@root/shared/components/atomics';
import { Link } from 'react-router-dom';

// Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: any) => ({
  card: {
    height: theme.spacing(49),
  },
  media: {
    width: '100%',
    paddingTop: '56.25%',
    backgroundSize: 'contain',
  },
  title: {},
  descrip: {
    opacity: 0.8,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

interface CustomCardProps {
  title: string;
  subtitle?: string;
  bg?: string;
  image?: string;
  id?: string;
}

export default function CustomCard({
  title,
  subtitle,
  image,
  id,
  bg = '/img/image-placeholder-gray.png',
}: CustomCardProps) {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.card}>
      <CardActionArea component={Link} to={`/projects/${id}`}>
        {/* cover prop is not in MUI CardMedia types; use any spread per migration spec any-policy */}
        <CardMedia
          className={classes.media}
          image={image}
          {...({ cover: true } as any)}
          title={title}
        />
        <CardContent>
          <Box className={classes.title}>
            <Typography2 gutterBottom variant="h5" component={'h2'} align="center">
              {title}
            </Typography2>
          </Box>
          <Box>
            <Typography2
              variant="body2"
              color="textPrimary"
              component="p"
              className={classes.descrip}
              align="center"
            >
              {subtitle}
            </Typography2>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
