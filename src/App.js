import React from 'react';
import { Route, Switch, Redirect,withRouter } from "react-router-dom"

//redux imports
import {connect} from "react-redux"
import {logout, authCheckState} from "./store/actions/auth"

import Layout from "./components/Layout"
import BurgerBuilder from "./containers/BurgerBuilder"

//implementing lazy loading
import asyncComponent from "./HOC/asyncComponent"
const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout')
})

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders')
})

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth')
})

const asyncRegister = asyncComponent(()=>{
  return import('./containers/Auth/register')
})

class App extends React.Component{
  logout=()=>{
    console.log("App.js calling logout")
    this.props.logout()
    return <Redirect to="/auth" />
  }
  componentDidMount(){
    this.props.autoAuthenticate()
  }
  render(){
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/register" component={asyncRegister} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout"  component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/register" component={asyncRegister} />          
          <Route path="/logout" render={()=>this.logout()} /> 
          <Redirect to="/" />
        </Switch>

      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps =(state)=>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    logout: ()=>dispatch(logout()),
    autoAuthenticate:()=>dispatch(authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
