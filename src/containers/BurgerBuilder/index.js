import React,{Component} from "react"

import Aux from "../../HOC/Aux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls"

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component{
  state ={
    ingredients:{
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },
    totalPrice:10,
    purchasable: false  //flag to activate order now button
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
      return sum + element
    },0)
    this.setState({purchasable: sum > 0})
  }

  render(){
    const disableInfo = {
      ...this.state.ingredients
    }
    for(let key in disableInfo){
      //whether we disable button or not
      disableInfo[key] = disableInfo[key] <= 0
    }
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
            addIngredient={this.addIngredientHandler} 
            removeIngredient={this.removeIngredientHandler}
            disabled={disableInfo}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            />
      </Aux>
    )
  }
}

export default BurgerBuilder