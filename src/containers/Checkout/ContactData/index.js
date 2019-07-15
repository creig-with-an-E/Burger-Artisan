import React from 'react';
import axios from "../../../axios-orders"

import Button from "../../../components/common/Button"
import Spinner from "../../../components/common/Spinner"

import classes from "./ContactData.module.css"
class ContactData extends React.Component {
  state = {
    customer:{    
      name:"",
      email:"",
      address:{
        street:"",
        postal:""
    }},
    loading: false
  }

  orderHandler =(event)=>{
    event.preventDefault()
    this.setState({loading:true})
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer:{
        name:"creig",
        address:{
          street:"creig's address",
          postal:"t9k1J8"
        }
      }
    }

    axios.post('/orders.json',order)
      .then(response=>{
        this.setState({loading:false, purchasing: false})
        this.props.history.push("/")  
      })
      .catch(error=>{
        this.setState({loading: false, purchasing: false})
        console.log(error)
      })
  }
  
  render() {
    let form = ( <form>
      <input className={classes.Input} type="text" name="name" placeholder="enter your name" />
      <input className={classes.Input} type="email" name="email" placeholder="enter your email" />
      <input className={classes.Input} type="text" name="street" placeholder="enter your street" />
      <input className={classes.Input} type="text" name="postal" placeholder="enter your postal code" />
      <Button buttonType="Success" click={this.orderHandler}>Submit</Button>
    </form> ) 
    if(this.state.loading){
      form = <Spinner />
    }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
        {form}
    </div>);
  }
}
 

export default ContactData;