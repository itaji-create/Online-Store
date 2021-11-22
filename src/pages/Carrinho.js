import React from 'react';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.state = {
      carrinho: JSON.parse(localStorage.getItem('cartItems')),
      total: 0,
    };
    this.deleteCard = this.deleteCard.bind(this);
    this.changeQtd = this.changeQtd.bind(this);
  }

  deleteCard({ target }) {
    const { carrinho } = this.state;
    const name = target.parentNode.parentNode.firstChild.innerText;
    const i = carrinho.findIndex((card) => card.id === name);
    carrinho.splice(i, 1);
    this.setState({ carrinho });
    localStorage.setItem('cartItems', JSON.stringify([...carrinho]));
  }

  changeQtd({ target }) {
    const operator = target.id;
    const { carrinho } = this.state;
    const name = target.parentNode.parentNode.firstChild.innerText;
    const i = carrinho.findIndex((e) => e.id === name);
    console.log(this.state);
    if (operator === '+') {
      carrinho[i].qtd += 1;
      this.setState({ carrinho });
      localStorage.setItem('cartItems', JSON.stringify([...carrinho]));
    } else {
      if (carrinho[i].qtd >= 1) carrinho[i].qtd -= 1;
      this.setState({ carrinho });
      localStorage.setItem('cartItems', JSON.stringify([...carrinho]));
    }
  }

  render() {
    const { carrinho, total } = this.state;
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
              <p>
                <i>R$: </i>
                { item.price }
              </p>
              <div>
                <p data-testid="shopping-cart-product-quantity">
                  <i>Qtd: </i>
                  { item.qtd }
                </p>
                <button
                  type="button"
                  id="+"
                  onClick={ this.changeQtd }
                  data-testid="product-increase-quantity"
                >
                  +
                </button>
                <button
                  type="button"
                  id="-"
                  onClick={ this.changeQtd }
                  data-testid="product-decrease-quantity"
                >
                  -
                </button>
                <button type="button" onClick={ this.deleteCard }>remover</button>
              </div>
            </div>
          ))
        )
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <div>
          <h2>Resumo do pedido</h2>
          <h3>
            <i>Total: </i>
            { total }
          </h3>
          <button type="button">Continuar</button>
        </div>
      </div>
    );
  }
}
export default Carrinho;
