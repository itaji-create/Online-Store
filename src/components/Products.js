import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  render() {
    const { title, image, price, id } = this.props;
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
      </div>
    );
  }
}

Products.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Products;
