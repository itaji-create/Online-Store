import React from 'react';
import { Link } from 'react-router-dom';

class SearchInput extends React.Component {
  render() {
    return (
      <section>
        <input type="text" placeholder="Pesquise produto" />
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
      </section>
    );
  }
}

export default SearchInput;
