import React from 'react';
import PropTypes from 'prop-types';

class Products extends React.Component {
  render() {
    const { title, image, price } = this.props;
    return (
      <div className="product" data-testid="product">
        <h4>{ title }</h4>
        <img src={ image } alt={ title } />
        <p>{ price }</p>
      </div>
    );
  }
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Products;
