import React from 'react';
import { connect } from "react-redux"

import axios from "../../../axios-orders"
import Button from "../../../components/common/Button"
import Spinner from "../../../components/common/Spinner"
import classes from "./ContactData.module.css"
import withErrorHandler from "../../../HOC/withErrorHandler"
import {purchaseBurger} from "../../../store/actions/order"
import Input from "../../../components/common/Input"

class ContactData extends React.Component {
  state = {
    orderForm:{
      name:{
        elementType:"input",
        elementConfig:{
          type: "text",
          placeholder:"Your Name"
        },
        value:"",
        validation:{
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false //checks if used has touched the field
      },
      email:{
        elementType:"input",
        elementConfig:{
          type: "email",
          placeholder:"Your Email"
        },
        value:"",
        validation:{
          required: true
        },
        valid: false,
        touched: false //checks if used has touched the field
      },
      street:{
        elementType:"input",
        elementConfig:{
          type: "text",
          placeholder:"street"
        },
        value:"",
        validation:{
          required: true
        },
        valid: false,
        touched: false //checks if used has touched the field
      },
      zipcode:{
        elementType:"input",
        elementConfig:{
          type: "text",
          placeholder:"zipcode"
        },
        value:"",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
      },
        valid: false,
        touched: false //checks if used has touched the field
      },
      country:{
        elementType:"input",
        elementConfig:{
          type: "text",
          placeholder:"Country"
        },
        value:"",
        validation:{
          required: true,
          minLength:3,
          maxLength:5
        },
        valid: false,
        touched: false //checks if used has touched the field
      },
      deliveryMethod:{
        elementType:"select",
        elementConfig:{
          options:[
            { value:"fastest", displayValue:"Fastest" },
            { value:"regular", displayValue:"Regular" }            
          ]
        },
        value:"fastest",
        validation:{},
        valid: true,
        touched: false //checks if used has touched the field
      }
    },
    formIsValid: false
  }

  orderHandler =(event)=>{
    event.preventDefault()
    const formData = {}
    for(let element in this.state.orderForm){
      formData[element] = this.state.orderForm[element].value
    }
    const order = {
      contact: formData,
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice.toFixed(2),
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token)
  }
  
  inputChangedHandler=(event,elementName)=>{
    const formDataCopy = {...this.state.orderForm}
    const updatedElement={...formDataCopy[elementName]}

    updatedElement.value =event.target.value
    updatedElement.touched = true
    updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation)
    formDataCopy[elementName] = updatedElement
    
    let formIsValid = true
    for(let inpt in formDataCopy){
      formIsValid = formDataCopy[inpt].valid && formIsValid
    }
    this.setState({
      orderForm: formDataCopy,
      formIsValid: formIsValid
    })
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

  render( ) {
    const formElements = []
    for(let key in this.state.orderForm){
      formElements.push({
        id: key,
        config:this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(el=>{
          return <Input elementType={el.config.elementType} elementConfig={el.config.elementConfig}
                    key={el.id} value={el.config.value} changed={(event)=>this.inputChangedHandler(event,el.id)}
                    invalid={!el.config.valid} shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    />
        })}
        <Button disabled={!this.state.formIsValid} buttonType="Success" >Submit</Button>
      </form> 
    ) 
    if(this.props.loading){
      form = <Spinner />
    }
  return (
    <div className={classes.CheckoutData}>
      <h4>Enter your contact details</h4>
        {form}
    </div>);
  }
}

const mapStateToProps =(state)=>{
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps =(dispatch)=>{
  return {
    onOrderBurger: (data, token)=>dispatch(purchaseBurger(data,token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))