import React from "react";
import { Typography } from "@material-ui/core";


export default function Description(props) {
  return (
    <Typography color="textSecondary" align={props.align} paragraph>
      {props.text}
      {props.children}
    </Typography>
  );
}
