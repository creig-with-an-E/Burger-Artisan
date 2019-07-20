import React from 'react';
import {Route, Redirect } from "react-router-dom"
import {connect} from "react-redux"

import CheckoutSummary from "../../components/Order/CheckoutSummary"
import ContactData from "./ContactData"
class Checkout extends React.Component {
  checkoutCancelledHandler=()=>{
    this.props.history.goBack()
  }

  checkoutContinueHandler=()=>{
    this.props.history.replace("/checkout/contact-data")
  }
  render(){
    let summary =<Redirect to="/" />
    if(this.props.ingredients){
    let purchaseRedirect = this.props.purchased?<Redirect to="" /> : null
      summary =(
        <React.Fragment>
          {purchaseRedirect}
          <CheckoutSummary ingredients={this.props.ingredients} 
            checkoutCancel={this.checkoutCancelledHandler} 
            checkoutContinue={this.checkoutContinueHandler}/>
        </React.Fragment>
      )
    }
    return(
      <div>
          {summary}
          {/* setting path relative to current path */}
          <Route path={this.props.match.path + "/contact-data"}
                 render={(props)=>(<ContactData {...props}/>)}
                 />
      </div>
    )
  }
}
const mapStateToProps=state=>{
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout)