import React from 'react';
import { makeStyles } from '@root/shared/styles';
import { ListItem, List, ListSubheader } from '@root/shared/components/atomics';
import { Grid } from '@root/shared/components/atomics/Grid';
import { Typography2 } from '@root/shared/components/atomics/Typography';
import { Link } from '@root/shared/components/atomics/Link';
import { blue } from '@root/shared/styles';

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
        <Typography2>{`${listSymbol} ${text}`}</Typography2>
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
        <Typography2>
          <Link
            href={item}
            className={classes.linkText}
          >{`${listSymbol} ${linktext}`}</Link>
        </Typography2>
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
