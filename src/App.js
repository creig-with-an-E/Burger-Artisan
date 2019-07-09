import React from 'react';

import Layout from "./components/Layout"
import BurgerBuilder from "./containers/BurgerBuilder"

const App=()=> {
  return (
    <Layout>
      <BurgerBuilder />
    </Layout>
  );
}

export default App;
