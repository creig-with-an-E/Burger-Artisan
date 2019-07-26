/*
  serves as the wrapper for the entire app
*/
import React from "react";
import {connect} from "react-redux"
import Aux from "../../HOC/Aux";
import Toolbar from "../../navigation/toolbar";
import SideDrawer from "../../navigation/SideDrawer";

import classes from "./layout.module.css";
class Layout extends React.Component {
  state ={
    showSideDrawer: false
  }
  sideDrawerClosedHandler=()=>{
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerToggleHandler =()=>{
    this.setState((prevState)=>{
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer isAuthenticated={this.props.isAuthenticated} visible={this.state.showSideDrawer} toggleSideDrawer={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps =(state)=>{
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps, null)(Layout)
