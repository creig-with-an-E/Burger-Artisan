import React from 'react';
import classes from "./Toolbar.module.css"
import NavigationItems  from "../navigationItems"
import ToggleButton  from "../SideDrawer/toggleButton"

import Logo from "../../components/Logo"
const toolbar =props =>{
  
  return(
    <header className={classes.Toolbar}>
      <ToggleButton click={props.drawerToggleClicked}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  )
}

export default toolbar