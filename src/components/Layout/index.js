/*
  serves as the wrapper for the entire app
*/
import React from "react";
import Aux from "../../HOC/Aux"

import classes from "./layout.module.css"
const layout = (props) => {
  return(
  <Aux>
    <div>Toolbar | Sidebar | Backdrop</div>
    <main className={classes.Content}>
        {props.children}
    </main>
  </Aux>
  )
};

export default layout