import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchInput from './components/searchInput';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ SearchInput } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
