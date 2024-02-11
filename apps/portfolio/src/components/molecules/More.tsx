import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SVGLine from '../atomics/SVGLine';
import { Typography2 } from '@root/shared/components/atomics/Typography';
import { makeStyles } from '@root/shared/styles';

export default function SeeMyProject(props) {
  //Styles

  const useStyles = makeStyles((theme) => ({
    simple: {
      height: props.height + 'px',
      lineHeight: props.height + 'px',
      display: 'inline-block',
    },
    text: {
      textTransform: 'uppercase',
    },
  }));
  const classes = useStyles();

  return (
    <div className='flex flex-nowrap'>
      <ExpandMoreIcon
        className={classes.simple}
        style={{ marginLeft: '-6px' }}
      />
      <Typography2 noWrap className={`${classes.simple} ${classes.text}`}>
        See My Projects{' '}
      </Typography2>
      <SVGLine height={props.height} />
    </div>
  );
}
