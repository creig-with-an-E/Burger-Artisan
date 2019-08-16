import React from 'react';
import classes from "./Button.module.css"

const button =(props)=>{
  const classNames = `${classes.Button} ${classes[props.buttonType]}`
    return(
      <button disabled={props.disabled}className={classNames} 
        onClick={props.click}>
        <span style={{alignText:"center", paddingLeft:5}}>{props.children}</span>
      </button>)
}

export default button