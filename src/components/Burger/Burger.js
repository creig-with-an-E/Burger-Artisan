import React from 'react';
import classes from './Burger.module.css'

import Ingredient from "./BurgerIngredients/Ingredient"
const burger =(props)=>{
  //tranforming the object to array

  let transformedIngredients = Object.keys(props.ingredients).map(item=>{
    return [...Array(props.ingredients[item])]
              .map((_,i)=>{
               return <Ingredient key={item + i} type={item} />
              })
  }).reduce((arr, element)=>{
        // arr is the accumulated array that is sent to every call
        return arr.concat(element)
        },[])
if(transformedIngredients.length === 0){
  transformedIngredients = <p>Start adding ingredients</p>
}
  return(
    <div className={classes.Burger}>
      <Ingredient type={"bread-top"} />
      {transformedIngredients}
      <Ingredient type={"bread-bottom"} />
    </div>
  )
}

export default burger;