import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Products extends React.Component {
  render() {
    const { title, image, price, obj } = this.props;
    return (
      <div className="product" data-testid="product">
        <h4>{ title }</h4>
        <img src={ image } alt={ title } />
        <p>
          R$:
          { price }
        </p>
        <Link
          data-testid="product-add-to-cart"
          to={ {
            pathname: '/carrinho',
            ItensCart: obj,
          } }
        >
          Adicionar ao Carrinho
        </Link>
      </div>
    );
  }
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  obj: PropTypes.object.isRequired,
};

export default Products;
