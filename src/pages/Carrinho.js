import React from 'react';
import PropTypes from 'prop-types';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.state = {
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
    );
  }
}

Carrinho.propTypes = {
  location: PropTypes.shape({
    ItensCart: PropTypes.objectOf(PropTypes.object()),
  }).isRequired,
};

export default Carrinho;
