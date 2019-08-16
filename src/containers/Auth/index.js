import React,{ Component } from 'react';
import {connect} from "react-redux"
import {Redirect, NavLink} from "react-router-dom"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import Spinner from "../../components/common/Spinner"
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/auth"

class Auth extends Component {
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
  },
  isValid: null
  } 
  
  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirect !== "/"){
      this.props.onSetAuthRedirect()
    }
  }

  submitHandler=(event)=>{
    event.preventDefault()
    const {email, password} = this.state.controls
    this.props.onAuth(email.value,password.value )
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

  inputChangedHandler=(event, controlName)=>{
  const updatedControls = {
    ...this.state.controls,
    [controlName]:{
    ...this.state.controls[controlName],
    value: event.target.value,
    valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
    touched: true
    },
  }

  this.setState({
    controls: updatedControls
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
            touched={el.config.touched}
            />
      })
  )

  if(this.props.loading){
    form = <Spinner />
  }
  const showButton = (this.state.controls.email.valid && this.state.controls.password.valid)
  let errorMessage = this.props.error ? <p style={{color: "red"}}>{this.props.error}</p> :  ""
    // if authenticated user is redirected
    if(this.props.authenticated){
        return <Redirect to={this.props.authRedirect} />
      }else{
        return ( 
          <div className={classes.Auth}>
          <form onSubmit={this.submitHandler}>
          {form}
          {errorMessage}
          <Button disabled={!showButton} buttonType="Success" >Login</Button>
          </form>
          <NavLink style={{textDecoration: "none",}} to="/register"><Button buttonType="Danger">New User?</Button></NavLink>
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
    onAuth:(email, password)=>dispatch(actions.auth(email,password)),
    onSetAuthRedirect: ()=>dispatch(actions.setAuthRedirect("/"))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);