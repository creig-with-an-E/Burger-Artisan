/*
  serves as the wrapper for the entire app
*/
import React from "react";
import Aux from "../../HOC/Aux"
import Toolbar from "../../navigation/toolbar"

import classes from "./layout.module.css"
const layout = (props) => {
  return(
  <Aux>
    <Toolbar />
    <main className={classes.Content}>
        {props.children}
    </main>
  </Aux>
  )
};

export default layout