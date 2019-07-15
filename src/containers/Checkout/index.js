import React from 'react';
import {Route } from "react-router-dom"

import CheckoutSummary from "../../components/Order/CheckoutSummary"
import ContactData from "./ContactData"

class Checkout extends React.Component {
  componentWillMount(){
    const queryParams = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0
    for(let param of queryParams){
      if(param[0]=== "price"){
        price = param[1]
      }else{
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ingredients, totalPrice: price})
  }

  state = {
    ingredients: null,
    totalPrice:0
  }

  checkoutCancelledHandler=()=>{
    this.props.history.goBack()
  }

  checkoutContinueHandler=()=>{
    this.props.history.replace("/checkout/contact-data")
  }
  render(){
    return(
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} 
          checkoutCancel={this.checkoutCancelledHandler} 
          checkoutContinue={this.checkoutContinueHandler}/>
          {/* setting path relative to current path */}
          <Route path={this.props.match.path + "/contact-data"}
                 render={(props)=>(<ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} {...props}/>)}
                 />
      </div>
    )
  }
}

export default Checkout