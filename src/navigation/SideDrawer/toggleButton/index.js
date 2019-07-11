import React from 'react';
import classes from "./ToggleButton.module.css"

const toggleButton = (props) => {
    return (
      <div onClick={props.click} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
}
 
export default toggleButton;