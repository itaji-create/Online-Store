import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Products extends React.Component {
  render() {
    const { title, image, price, id, obj, handleClick } = this.props;
    return (
      <div className="product" data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ `/product-detail/${id}` }
        >
          { title }
        </Link>
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
          <button
            type="button"
            id={ id }
            onClick={ handleClick }
          >
            Adicionar ao carrinho
          </button>
        </Link>
      </div>
    );
  }
}

Products.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  obj: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Products;
