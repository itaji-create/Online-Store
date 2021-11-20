import React from 'react';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.state = {
      carrinho: JSON.parse(localStorage.getItem('cartItems')),
    };
  }

  render() {
    const { carrinho } = this.state;
    return (
      <div>
        {carrinho !== null ? (
          carrinho.map((item) => (
            <div key={ item.id }>
              <p>{ item.id }</p>
              <h3
                data-testid="shopping-cart-product-name"
              >
                {item.title}
              </h3>
              <img src={ item.thumbnail } alt={ item.title } />
              <p data-testid="shopping-cart-product-quantity">1</p>
            </div>
          ))
        )
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}
export default Carrinho;
