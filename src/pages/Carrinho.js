import React from 'react';
import PropTypes from 'prop-types';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.state = {
      
// requisito-8
      products: [],
      minValue: 1,
    };
    this.quantProducts = this.quantProducts.bind(this);
  }

  componentDidMount() {
    this.getproducts();
  }

  getproducts = () => {
    const { location } = this.props;
    const { products } = this.state;
    if (products.length > 0 && location.ItensCart) {
      return this.setState({ products: [...products, ...location.ItensCart] });
    }
    if (products.length === 0 && location.ItensCart) {
      return this.setState({ products: [location.ItensCart] });
    }
  }

  quantProducts(event) {
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { products, minValue } = this.state;
    return (
      products.length > 0
        ? (
          products.map((product) => (
            <div
              data-testid="shopping-cart-button"
              key={ product.id }
              className="product"
            >
              <h4 data-testid="shopping-cart-product-name">{ product.title }</h4>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>
                R$:
                { product.price }
              </p>
              <label htmlFor="quantidade">
                Quantidade:
                {/* <input
            id="quantidade"
            type="number"
            min="1"
            name={ product.id }
            onChange={ this.quantProducts }
            value={this.state[product.id]}
          /> */}
              </label>
              <p data-testid="shopping-cart-product-quantity">{ minValue }</p>
            </div>
          ))
        )
        : (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
//fim requisito 8
          // inicio requisito 10
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
//fim requisito 10
    );
  }
}

Carrinho.propTypes = {
  location: PropTypes.shape({
    ItensCart: PropTypes.objectOf(PropTypes.object()),
  }).isRequired,
};

export default Carrinho;
