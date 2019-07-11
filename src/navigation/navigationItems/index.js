import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem  from "./navigationItem"
const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>Builder</NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  )
}

export default navigationItems