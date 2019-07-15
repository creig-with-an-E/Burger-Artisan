import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem  from "./navigationItem"
const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Builder</NavigationItem>
      <NavigationItem link="/orders">Checkout</NavigationItem>
    </ul>
  )
}

export default navigationItems