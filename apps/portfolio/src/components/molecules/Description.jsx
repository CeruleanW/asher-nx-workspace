import React from "react";
import { Typography2 } from '@root/shared/components/atomics';

export default function Description(props) {
  return (
    <Typography2 color="textSecondary" align={props.align} paragraph>
      {props.text}
      {props.children}
    </Typography2>
  );
}
