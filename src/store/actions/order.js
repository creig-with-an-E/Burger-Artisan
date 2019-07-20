import * as actionTypes from  "./actionTypes"
import axios from "../../axios-orders"

export const purchaseBurgerSuccess =(id,orderData)=>{
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      orderId: id,
      orderData: orderData
    }
  }
}

export const purchaseBurgerFailed=(error)=>{
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    payload:{
      error: error
    }
  }
}

export const purchaseBurgerStart =()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger=(orderData)=>{
  return (dispatch)=>{
    dispatch(purchaseBurgerStart())
    axios.post("/orders.json",orderData)
      .then(response=>{
        dispatch(purchaseBurgerSuccess(response.data.name,orderData))
      }).catch(error=>{
        dispatch(purchaseBurgerFailed(error))
      })

  }
}

export const purchaseInit=()=>{
  return{
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrders =()=>{
  return (dispatch)=>{
    dispatch({type:actionTypes.FETCH_ORDERS_START})
    axios.get("/orders.json")
        .then(result=>{
          const fetchedOrders = []
          for(let key in result.data){
            // transforming data to array format for easier iteration and retaining key so we can reference back to firebase
            fetchedOrders.push({...result.data[key],id: key})
          }
          dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(error=>{
          dispatch(fetchOrderFail(error))
        })
  }
}

const fetchOrdersSuccess =(data)=>{
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: {
      orders: data
    }
  }
}

const fetchOrderFail=(error)=>{
   return {
     type: actionTypes.FETCH_ORDERS_FAIL,
     payload: {
       error: error.message
     }
   }
}