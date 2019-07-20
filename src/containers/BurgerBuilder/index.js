import React,{Component} from "react"
import axios from "../../axios-orders"
import {connect} from "react-redux"

// action creators
import {addIngredient, removeIngredient, initializeIngredients} from "../../store/actions/burger"
import {purchaseInit} from "../../store/actions/order"

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
    this.props.initializeIngredients()
  }

  updatePurchaseState=(ingredients)=>{
    const sum = Object.keys(ingredients).map(key=>ingredients[key]).reduce((sum,element)=>{
      return sum + element},0)
    return sum > 0
  }

  purchaseHandler=()=>{
    this.setState({purchasing: true})
  }

  purchaseCancelHandler=()=>{
    //closes modal
    this.setState({purchasing: false})
  }

  purchaseContinueHandler =()=>{
    this.props.purchaseInit()
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
          addIngredient={(ingredientName)=>this.props.addIngredient(ingredientName)} 
          removeIngredient={(ingredientName)=>this.props.removeIngredient(ingredientName)}
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
    error: state.burger.error
  }
}


export default connect(mapPropsToState, {purchaseInit,addIngredient, removeIngredient, initializeIngredients})(withErrorHandler(BurgerBuilder, axios))