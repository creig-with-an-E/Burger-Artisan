import React,{ Component } from 'react';
import {connect} from "react-redux"
import {Redirect, NavLink} from "react-router-dom"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import Spinner from "../../components/common/Spinner"
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/auth"

class Register extends Component {
  state ={
  controls:{
    email:{
    elementType:"input",
    elementConfig:{
      type: "email",
      placeholder:"Your Email"
    },
    value:"",
    validation:{
      required: true,
      isEmail: true,

    },
    valid: false,
    touched: false //checks if used has touched the field
    },
    password:{
    elementType:"input",
    elementConfig:{
      type: "password",
      placeholder:"Your Password"
    },
    value:"",
    validation:{
      required: true,
      minLength: 6,

    },
    valid: false,
    touched: false //checks if used has touched the field
    },

    // confirm password control
    confirmPassword:{
      elementType:"input",
      elementConfig:{
        type: "password",
        placeholder:"Confirm Passsword"
      },
      value:"",
      validation:{
        required: true,
        minLength: 6,
        passwordConfirmField: true 
      },
      valid: false,
      touched: false //checks if used has touched the field
      },
  },
  isValid : false
  } 
  
  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirect !== "/"){
      this.props.onSetAuthRedirect()
    }
  }

  submitHandler=(event)=>{
    event.preventDefault()
    const {email, password} = this.state.controls
    this.props.onRegister(email.value,password.value )
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
    if(rules.passwordConfirmField){
        isValid = (value === this.state.controls.password.value) && isValid
    }
    return isValid;
}

  inputChangedHandler=(event, controlName)=>{
    const isValidProperty = this.checkValidity(event.target.value,this.state.controls[controlName].validation)
    const updatedControls = {
    ...this.state.controls,
    [controlName]:{
    ...this.state.controls[controlName],
    value: event.target.value,
    // valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
    valid: isValidProperty,
    touched: true
    }
  }

  this.setState({
    controls: updatedControls,
    isValid: isValidProperty
  })
  }

  render() {
    const formElements = []
    for(let key in this.state.controls){
      formElements.push({
      id: key,
      config:this.state.controls[key]
      })
    }
    let form = (
      formElements.map(el=>{
        return <Input elementType={el.config.elementType} elementConfig={el.config.elementConfig}
            key={el.id} value={el.config.value} changed={(event)=>this.inputChangedHandler(event,el.id)}
            invalid={!el.config.valid} shouldValidate={el.config.validation}
            touched={el.config.touched} passwordConfirmField={el.config.validation.passwordConfirmField}
            />
      })
  )

  if(this.props.loading){
    form = <Spinner />
  }

  let errorMessage = this.props.error ? <p style={{color: "#f50"}}>{this.props.error}</p> :  ""
  const {password, confirmPassword} = this.state.controls
  const disableButton = (password.value === confirmPassword.value) && (password.value !== "") && (confirmPassword.value !== "")
  // if authenticated user is redirected
    if(this.props.authenticated){
        return <Redirect to={this.props.authRedirect} />
      }else{
        return ( 
          <div className={classes.Auth}>
          <form onSubmit={this.submitHandler}>
          {form}
          <Button disabled={!disableButton} buttonType="Success" >Create Account</Button>
          {errorMessage}
          </form>
          {/* <Button buttonType="Danger" click={}>Returning User </Button> */}
          <NavLink style={{textDecoration: "none"}} to="/auth"><Button buttonType="Danger">Returning user?</Button></NavLink>         
          </div> );
      }
    }
}

const mapStateToProps =(state)=>{
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authenticated: state.auth.token !== null,
    buildingBurger : state.burger.building,
    authRedirect: state.auth.authRedirectPath
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onRegister:(email, password)=>dispatch(actions.register(email,password)),
    onSetAuthRedirect: ()=>dispatch(actions.setAuthRedirect("/"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);