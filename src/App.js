import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchInput from './components/searchInput';
import Carrinho from './pages/Carrinho';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <header />
      <Switch>
        <Route exact path="/" component={ SearchInput } />
        <Route exact path="/carrinho" component={ Carrinho } />
        <Route exact path="/product-detail/:id" component={ ProductDetail } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
