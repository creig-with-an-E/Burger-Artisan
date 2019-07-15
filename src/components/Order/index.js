import React from 'react';
import classes from "./Order.module.css"

const order =(props)=>{
  const ingredients = []

  for(let ingr in props.ingredients){
    ingredients.push({
      name: ingr,
      value:props.ingredients[ingr]})
  }
  console.log(props.ingredients)
  const ingredientOutput = ingredients.map(ig=>{
    return (<span
               key={ig.name}
               style={{textTransform:"capitalize", 
                   display:"inline-block", 
                   margin:"5px",
                   padding:"5px",
                   border: "1px solid #1a1a1a"
                  }} 
            >
            {ig.name}: ({ig.value})</span>)
  })
  return(
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price:<strong>US{props.totalPrice}</strong></p>
    </div>
  )
}

export default order