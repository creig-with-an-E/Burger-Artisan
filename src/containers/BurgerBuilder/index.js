import React,{Component} from "react"
import axios from "../../axios-orders"

import Aux from "../../HOC/Aux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls"
import Modal from "../../components/common/Modal/"
import OrderSummary from "../../components/Burger/OrderSummary"
import Spinner from "../../components/common/Spinner"
import withErrorHandler from "../../HOC/withErrorHandler"

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component{
  state ={
    ingredients:null,
    totalPrice:10,
    purchasable: false,  //flag to activate order now button
    purchasing: false,
    loading: false,
    error: true
  }

  componentDidMount(){
    axios.get("/ingredients.json")
      .then(response=>{
        this.setState({
          ingredients: response.data
        })
      }).catch(error=>{
        this.setState({
          error: true
        })
      })
  }
  
  addIngredientHandler=(type)=>{
    const count = this.state.ingredients[type] + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] =count
    const totalPrice= INGREDIENT_PRICES[type] + this.state.totalPrice 
    this.setState({
      totalPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler=(type)=>{
    const ingredients = {...this.state.ingredients}
    let count = this.state.ingredients[type]
    let totalPrice = this.state.totalPrice
    if(count>0){
      count -=1
      totalPrice -= INGREDIENT_PRICES[type]
    }
    ingredients[type] = count
    this.setState({ ingredients, totalPrice})
    this.updatePurchaseState(ingredients)
  }

  updatePurchaseState=(ingredients)=>{
    const sum = Object.keys(ingredients).map(key=>ingredients[key]).reduce((sum,element)=>{
      return sum + element},0)
    this.setState({purchasable: sum > 0})
  }

  purchaseHandler=()=>{
    this.setState({purchasing: true})
  }

  purchaseCancelHandler=()=>{
    //closes modal
    this.setState({purchasing: false})
  }

  purchaseContinueHandler =()=>{
    this.setState({loading:true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        name:"Creig Phiri",
        address: {
          street:"test street",
          zip:"M3j1L7",
          country:"Canada"
        },
        email:"creig@gmail.com",
        deliveryOptions:"fastest"
      }
    }
    axios.post('/orders.json',order)
      .then(response=>{
        this.setState({loading:false, purchasing: false})
        console.log(response)})
      .catch(error=>{
        this.setState({loading: false, purchasing: false})
        console.log(error)
      })
  }

  render(){
    const disableInfo = {
      ...this.state.ingredients
    }
    for(let key in disableInfo){
      //whether we disable button or not
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />

    if(this.state.ingredients){
      burger = (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          addIngredient={this.addIngredientHandler} 
          removeIngredient={this.removeIngredientHandler}
          disabled={disableInfo}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
        />
      </Aux>
    )
    
    orderSummary = (
      <OrderSummary ingredients={this.state.ingredients}
      totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios)