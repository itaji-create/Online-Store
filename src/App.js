import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchInput from './components/searchInput';
import Carrinho from './pages/Carrinho';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ SearchInput } />
        <Route exact path="/carrinho" component={ Carrinho } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
