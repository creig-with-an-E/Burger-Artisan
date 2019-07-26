import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem  from "./navigationItem"
const navigationItems = props => {
  const authenticatedRoutes = (          
    <React.Fragment>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/logout">Logout</NavigationItem>
    </React.Fragment>
  )
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Builder</NavigationItem>
      {
          !props.isAuthenticated? <NavigationItem link="/auth">Login</NavigationItem> : authenticatedRoutes
      }
    </ul>
  )
}

export default navigationItems