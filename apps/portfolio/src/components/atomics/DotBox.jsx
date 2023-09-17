import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles  } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    dotbox: {
      position: "relative",
      zIndex: -1,
      backgroundImage: "radial-gradient(cadetblue 20%, transparent 0)",
      backgroundSize: "16px 16px",
      backgroundPosition: "0 0, 20px 20px",
      transform:
        "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
      transformStyle: "preserve-3d",
      opacity: 0.5,
      height: theme.spacing(50),
      width: "60%",
      marginTop: -theme.spacing(40),
      marginLeft: -theme.spacing(10)
    },
  };
});

export default function DotBox() {
  // small dots used for presentation
  const classes = useStyles();
  return <Box className={classes.dotbox}></Box>;
}
