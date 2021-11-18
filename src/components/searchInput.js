import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';

class SearchInput extends React.Component {
  render() {
    return (
      <div className="page">
        <header>
          <h1
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <input type="text" placeholder="Pesquise produto" />
          <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
        </header>
        <Category />
      </div>
    );
  }
}

export default SearchInput;
