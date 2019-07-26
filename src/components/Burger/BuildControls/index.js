import React from 'react';
import classes from "./BuildControls.module.css"
import Control  from "./Controls/Control"

const controls = [
    {label: "Salad", type:"salad"},
    {label: "Bacon", type:"bacon"},
    {label: "Meat", type:"meat"},
    {label: "Cheese", type:"cheese"}

]
const buildControls =props =>{
//   holds list of controls
  return(
    <div className={classes.BuildControls}>
      <h3>Price: ${props.totalPrice.toFixed(2)}</h3>
      {
        controls.map(control=>{
          return ( 
            <Control 
              key={control.label} 
              label={control.label}
              type={control.type}
              addIngredient={()=>props.addIngredient(control.type)}
              removeIngredient={()=>props.removeIngredient(control.type)}
              /*** disabling particular control  ***/
              disabled={props.disabled[control.type]}
              />
          )})
      }
      <button className={classes.OrderButton} disabled={!props.purchasable} 
        onClick={props.purchaseHandler}>{props.isAuthenticated ? "ORDER NOW" : "SIGNUP TO CONTINUE"}</button>
    </div>
  )
}

export default buildControls