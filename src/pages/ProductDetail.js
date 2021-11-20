import React from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { getProductsById } from '../services/api';
import Products from '../components/Products';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params } } = props;
    this.state = {
      productInfo: [],
      load: false,
      id: params.id,
    };
    this.productDetails = this.productDetails.bind(this);
    this.saveCartItems = this.saveCartItems.bind(this);
  }

  componentDidMount() {
    this.productDetails();
  }

  saveCartItems = () => {
    const { productInfo: { title, thumbnail, price }, id } = this.state;
    const result = { title, thumbnail, price, id };
    if (localStorage.getItem('cartItems')) {
      const readLocalProducts = JSON.parse(localStorage.getItem('cartItems'));
      localStorage.setItem('cartItems', JSON.stringify([...readLocalProducts, result]));
    } else {
      localStorage.setItem('cartItems', JSON.stringify([]));
      const readLocalProducts = JSON.parse(localStorage.getItem('cartItems'));
      localStorage.setItem('cartItems', JSON.stringify([...readLocalProducts, result]));
    }
  };

  productDetails() {
    const { id } = this.state;
    getProductsById(id).then((data) => {
      this.setState({
        productInfo: data,
        load: true,
      });
    });
  }

  render() {
    const {
      productInfo: {
        title,
        thumbnail,
        price,
        id,
      },
      load,
    } = this.state;
    return (
      <div data-testid="product-detail-name">
        <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
        {load
          && <Products
            id={ id }
            title={ title }
            image={ thumbnail }
            price={ price }
            handleClick={ this.saveCartItems }
          />}
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
