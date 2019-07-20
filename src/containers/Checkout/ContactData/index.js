import React from 'react';
import {connect} from "react-redux"

import axios from "../../../axios-orders"
import Button from "../../../components/common/Button"
import Spinner from "../../../components/common/Spinner"
import classes from "./ContactData.module.css"
import withErrorHandler from "../../../HOC/withErrorHandler"
import {purchaseBurger} from "../../../store/actions/order"

class ContactData extends React.Component {
  state = {
    customer:{    
      name:"",
      email:"",
      address:{
        street:"",
        postal:""
    }},
  }

  orderHandler =(event)=>{
    event.preventDefault()
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice.toFixed(2),
      customer:{
        name:"creig",
        address:{
          street:"creig's address",
          postal:"t9k1J8"
        }
      }
    }
    this.props.onOrderBurger(order)
  }
  
  render() {
    let form = ( <form>
      <input className={classes.Input} type="text" name="name" placeholder="enter your name" />
      <input className={classes.Input} type="email" name="email" placeholder="enter your email" />
      <input className={classes.Input} type="text" name="street" placeholder="enter your street" />
      <input className={classes.Input} type="text" name="postal" placeholder="enter your postal code" />
      <Button buttonType="Success" click={this.orderHandler}>Submit</Button>
    </form> ) 
    if(this.props.loading){
      form = <Spinner />
    }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
        {form}
    </div>);
  }
}

const mapStateToProps =(state)=>{
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps =(dispatch)=>{
  return {
    onOrderBurger: (data)=>dispatch(purchaseBurger(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))