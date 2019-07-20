import * as actionTypes from "../actions/actionTypes"

const INITIAL_STATE = {
  orders:[],
  loading: false,
  purchased: false

}
const reducer =(state= INITIAL_STATE, action)=>{
  switch(action.type){
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGER_START:
      return {...state, loading: true}
    case actionTypes.PURCHASE_BURGER_SUCCESS: 
      const newObject ={
        ...action.payload.orderData,
        order:action.payload.orderId
      }
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newObject)
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return{...state, loading: false}
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {...state,orders: action.payload.orders, loading:false}
    case actionTypes.FETCH_ORDERS_FAIL:
      return {...state, loading: false, error: action.payload.error}
    default:
      return {...state}
  }
}

export default reducer