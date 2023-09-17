import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListSubheader,
  Grid,
  Link,
} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

export const useStyles = makeStyles((theme) => ({
  linkText: {
    color: blue[500],
    fontWeight: 900,
    // textShadow: "0 1px 0 rgba(0, 0, 0, 0.4)",
    // fontSize: theme.spacing(1.7)
  },
}));

export function FeatureList(props) {
  const { label, items, item, isLink, linktext } = props;
  const classes = useStyles();
  const listSymbol = '⊳';

  const MyListItem = ({ text }) => {
    return (
      <ListItem>
        <Typography>{`${listSymbol} ${text}`}</Typography>
      </ListItem>
    );
  };

  const renderItems = items
    ? items.map((item, index) => (
        <MyListItem text={item} key={'list-item-' + index} />
      ))
    : null;

  let renderItem;
  if (isLink) {
    renderItem = item ? (
      <ListItem>
        <Typography>
          <Link
            href={item}
            className={classes.linkText}
          >{`${listSymbol} ${linktext}`}</Link>
        </Typography>
      </ListItem>
    ) : null;
  } else {
    renderItem = item ? <MyListItem text={item} /> : null;
  }

  return (
    <Grid container item lg={3}>
      <div>
        <List>
          <ListSubheader disableGutters disableSticky>
            {label}
          </ListSubheader>
          {renderItems}
          {renderItem}
        </List>
      </div>
      {props.children}
    </Grid>
  );
}
