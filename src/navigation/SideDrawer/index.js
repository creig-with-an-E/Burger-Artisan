import React from 'react';
import Logo from "../../components/Logo"
import NavigationItems from "../navigationItems"
import classes from "./SideDrawer.module.css"
import Backdrop from "../../components/common/Backdrop"
import Aux from "../../HOC/Aux"

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if(props.visible){
    attachedClasses =[classes.SideDrawer,classes.Open]
  }
  return (
    <Aux>
      <Backdrop show={props.visible} click={props.toggleSideDrawer}/>
      <div className={attachedClasses.join(" ") }  onClick={props.toggleSideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
      </div>
    </Aux>

   );
}
 
export default sideDrawer;