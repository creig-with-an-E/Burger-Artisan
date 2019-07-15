import React, { Component } from 'react';
import Order from "../../components/Order"
import axios from "../../axios-orders"
import withErrorHandler from "../../HOC/withErrorHandler"
class Orders extends Component {
    state = {
      orders:[],
      loading:false,
      totalPrice:0
    }

    componentDidMount(){
      this.setState({loading: true})
      axios.get("/orders.json")
        .then(result=>{
          const fetchedOrders = []
          for(let key in result.data){
            // transforming data to array format for easier iteration and retaining key so we can reference back to firebase
            fetchedOrders.push({...result.data[key],id: key})
          }
          this.setState({
            orders: fetchedOrders,
            loading: false
          })
        }).catch(error=>{
          this.setState({loading: false})
        })
    }
    render() { 
        return (
          <div>
            {this.state.orders.map(order=>{
              console.log(order)
              return (<Order key={order.id}
                  ingredients={order.ingredients}
                  totalPrice={+order.totalPrice}
              />)
            })
            }
          </div>
        );
    }
}
 
export default withErrorHandler(Orders,axios);