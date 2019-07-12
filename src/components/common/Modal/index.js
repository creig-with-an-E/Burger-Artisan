import React from 'react';
import classes from "./Modal.module.css"
import Aux from "../../../HOC/Aux"
import Backdrop from "../Backdrop"

class modal extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  componentDidMount(){
    console.log(`Modal will mount`)
  }
  render(){
  const modalDisplay = this.props.show ? {transform: "translateY(0)", opacity:1}: {transform: "translateY(-100vh)", opacity: 0}
  return(
    <Aux>
      <Backdrop show={this.props.show} click={this.props.closeModal}/>
      <div className={classes.Modal} style={modalDisplay}>
        {this.props.children}
      </div>
    </Aux>

  )}
}

export default modal