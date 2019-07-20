// action creators for burger component
import axios from "../../axios-orders"

import * as actionTypes from "./actionTypes"

export const addIngredient =(name)=>{
  return {
    type:actionTypes.ADD_INGREDIENT,
    payload:{ingredientName: name}
  }
}

export const removeIngredient =(name)=>{
    return {
      type:actionTypes.REMOVE_INGREDIENT,
      payload:{ingredientName: name}
    }
}
const setIngredient=(ingredients)=>{
    return{
        type: actionTypes.INITIALIZE_INGREDIENTS,
        payload: {
            ingredients:ingredients
        }
    }
}
export const initializeIngredients =()=>{
    return (dispatch)=>{
      axios.get("/ingredients.json")
        .then(result=>{
            dispatch(setIngredient(result.data))
        }).catch(error=>{
            dispatch({
                type: actionTypes.ERROR,
                payload: {
                    error:error.message
                }
            })
        })
    }
}