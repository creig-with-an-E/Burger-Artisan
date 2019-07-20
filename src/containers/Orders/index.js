import React, { Component } from 'react';
import Order from "../../components/Order"
import axios from "../../axios-orders"
import withErrorHandler from "../../HOC/withErrorHandler"

//redux
import {connect} from "react-redux"
import {fetchOrders} from "../../store/actions/order"

import Spinner from "../../components/common/Spinner"

class Orders extends Component {
    state = {
      orders:[],
      loading:false,
      totalPrice:0
    }

    componentDidMount(){
      //fetching orders using redux
      this.props.onInitOrders()
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
            {orders}
          </div>
        );
    }
}

const mapStateToProps =(state)=>{
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps =(dispatch)=>{
  return {
    onInitOrders : ()=>dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))