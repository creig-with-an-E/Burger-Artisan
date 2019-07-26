import * as actionTypes from "../actions/actionTypes"

const INITIAL_STATE = {
      ingredients:null,
      totalPrice:10,
      error:null,
      loading: null,
      building: false,  //flag for showing whether user has started building
    }

const INGREDIENT_PRICES = {
      salad: 0.5,
      cheese: 0.4,
      meat: 1.3,
      bacon: 0.7
    }

const reducer =(state=INITIAL_STATE, action)=>{
    switch(action.type){
    case actionTypes.ADD_INGREDIENT:
      return {...state, ingredients:{
          ...state.ingredients, 
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName]+1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
        building: true
        }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state, 
        ingredients:{
            ...state.ingredients,
            [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] -1 
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
        building: true
      }
    case actionTypes.INITIALIZE_INGREDIENTS:
      return {...state, 
        ingredients: {
          salad: action.payload.ingredients.salad,
          cheese: action.payload.ingredients.cheese,
          bacon: action.payload.ingredients.bacon,
          meat: action.payload.ingredients.meat
        },
        totalPrice: 10,
        building: false
      }
    default:
      return state
  }
}

export default reducer