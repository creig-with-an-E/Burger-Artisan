import React from 'react';
import classes from "./Button.module.css"

const button =(props)=>{
  const classNames = `${classes.Button} ${classes[props.buttonType]}`
    return(
      <button className={classNames} 
        onClick={props.click}>
        {props.children}
      </button>)
}

export default button