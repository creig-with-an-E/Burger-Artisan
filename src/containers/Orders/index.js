import React, { Component } from 'react';
import Order from "../../components/Order"
import axios from "../../axios-orders"
import withErrorHandler from "../../HOC/withErrorHandler"

//redux
import { connect } from "react-redux"
import { fetchOrders } from "../../store/actions/order"

import Spinner from "../../components/common/Spinner"

class Orders extends Component {
    state = {
      orders:[],
      loading:false,
      totalPrice:0
    }

    componentDidMount(){
      //fetching orders using redux
      const {userId, token} = this.props
      this.props.onInitOrders(token,userId)
    }
    render() {
      let orders = <Spinner />
      if(!this.props.loading){
        orders = (this.props.orders.map(order=>{
            return (<Order key={order.id}
                ingredients={order.ingredients}
                totalPrice={order.totalPrice}
            />)
          })
          
        )
      }
        return (
          <div>
            <h1 style={{textAlign:"center"}}>Previous Orders</h1>
            {orders}
          </div>
        );
    }
}

const mapStateToProps =(state)=>{
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps =(dispatch)=>{
  return {
    onInitOrders : (token, userId)=>dispatch(fetchOrders(token,userId))
    // token is passed to annonymous function then passed down to fetch orders
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))