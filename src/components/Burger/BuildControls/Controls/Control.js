import React from 'react';
import classes from "./Control.module.css"

const Control = props =>{
  return(
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button onClick={props.removeIngredient} className={classes.Less} disabled={props.disabled}>-</button>
      <button onClick={props.addIngredient} className={classes.More}>+</button>
    </div>
  )
}

export default Control