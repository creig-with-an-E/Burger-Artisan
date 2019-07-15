/*
  serves as the wrapper for the entire app
*/
import React from "react";

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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer visible={this.state.showSideDrawer} toggleSideDrawer={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
