import React from 'react';
import { Route, Switch } from "react-router-dom"

import Layout from "./components/Layout"
import BurgerBuilder from "./containers/BurgerBuilder"
import Checkout from "./containers/Checkout"
import Orders from "./containers/Orders"

class App extends React.Component{
  render(){
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout"  component={Checkout} />
          <Route path="/orders" component={Orders}/>
        </Switch>
      </Layout>
    )
  }
}

export default App;
