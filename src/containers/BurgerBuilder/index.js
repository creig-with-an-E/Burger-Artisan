import React,{Component} from "react"
import axios from "../../axios-orders"
import {connect} from "react-redux"

// action creators
import { addIngredient, removeIngredient, initializeIngredients} from "../../store/actions/burger"
import { purchaseInit } from "../../store/actions/order"
import { setAuthRedirect } from "../../store/actions/auth"

// components
import Aux from "../../HOC/Aux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls"
import Modal from "../../components/common/Modal/"
import OrderSummary from "../../components/Burger/OrderSummary"
import Spinner from "../../components/common/Spinner"
import withErrorHandler from "../../HOC/withErrorHandler"

class BurgerBuilder extends Component{
  state ={
    purchasable: false,  //flag to activate order now button
    purchasing: false,
    loading: false,
  }

  componentDidMount(){
    if(!this.props.building){
      this.props.onInitializeIngredients()
    }
  }

  updatePurchaseState=(ingredients)=>{
    const sum = Object.keys(ingredients).map(key=>ingredients[key]).reduce((sum,element)=>{
      return sum + element},0)
    return sum > 0
  }

  purchaseHandler=()=>{
    if(!this.props.authenticated){
      //if not authenticated redirect to auth 
      this.props.onSetRedirectPath("/checkout")
      this.props.history.push("/auth")
    }else{
      this.setState({purchasing: true})
    }
  }

  purchaseCancelHandler=()=>{
    //closes modal
    this.setState({purchasing: false})
  }

  purchaseContinueHandler =()=>{
    this.props.onPurchaseInit()
    this.props.history.push("/checkout")
  }

  render(){
    const disableInfo = {
      ...this.props.ingredients
    }
    for(let key in disableInfo){
      //whether we disable button or not
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />

    if(this.props.ingredients){
      burger = (
      <Aux>
        <Burger ingredients={this.props.ingredients}/>
        <BuildControls 
          isAuthenticated={this.props.authenticated}
          addIngredient={(ingredientName)=>this.props.onAddIngredient(ingredientName)} 
          removeIngredient={(ingredientName)=>this.props.onRemoveIngredient(ingredientName)}
          disabled={disableInfo}
          totalPrice={this.props.totalPrice}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          purchaseHandler={this.purchaseHandler}
        />
      </Aux>
    )
    
    orderSummary = (
      <OrderSummary ingredients={this.props.ingredients}
      totalPrice={this.props.totalPrice}
      purchaseContinue={this.purchaseContinueHandler}
      purchaseCancelled={this.purchaseCancelHandler}
      />)
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing}
           closeModal={this.purchaseCancelHandler}
          >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}
const mapPropsToState =(state)=>{
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    authenticated: state.auth.token,
    building: state.auth.building
  }
}

const mapDispatchToProps =(dispatch)=>{
  return {
    onPurchaseInit:()=>dispatch(purchaseInit()),
    onAddIngredient:(ingredient)=>dispatch(addIngredient(ingredient)), 
    onRemoveIngredient:(ingredient)=>dispatch(removeIngredient(ingredient)), 
    onInitializeIngredients:()=>dispatch(initializeIngredients()),
    onSetRedirectPath:(path)=>dispatch(setAuthRedirect(path))
  }
    
}


export default connect(mapPropsToState, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))