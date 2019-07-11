import React from "react"
import Aux from "../../../HOC/Aux"
import Button from "../../common/Button"

const orderSummary =props=>{ 
  const summary = Object.keys(props.ingredients)                
  .map(igKey=>{ 
    return <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}</li>
  })

  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following</p>
      <ul>
        {summary}
      </ul>
      <h4>Total Price: ${props.totalPrice.toFixed(2)}</h4>
      <p>Continue to checkout?</p>
      <Button buttonType="Danger" click={props.purchaseCancelled}>CANCEL</Button>
      <Button buttonType="Success" click={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary