import React from 'react';
import classes from "./Modal.module.css"
import Aux from "../../../HOC/Aux"
import Backdrop from "../Backdrop"

const modal = props =>{
  const modalDisplay = props.show ? {transform: "translateY(0)", opacity:1}: {transform: "translateY(-100vh)", opacity: 0}
  return(
    <Aux>
      <Backdrop show={props.show} click={props.closeModal}/>
      <div className={classes.Modal} style={modalDisplay}>
        {props.children}
      </div>
    </Aux>

  )
}

export default modal