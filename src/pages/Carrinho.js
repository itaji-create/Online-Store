import React from 'react';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.state = {
       
    }
    }

  render() {
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    )
  }
}
export default Carrinho;