import React from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { getProductsById } from '../services/api';

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
    this.setSaveCard = this.setSaveCard.bind(this);
  }

  componentDidMount() {
    this.productDetails();
  }

  setSaveCard() {
    const { productInfo: { title, thumbnail, price }, id } = this.state;
    const result = { title, thumbnail, price, id, qtd: 1 };
    const readLocalProducts = JSON.parse(localStorage.getItem('cartItems'));
    localStorage.setItem('cartItems', JSON.stringify([...readLocalProducts, result]));
  }

  saveCartItems = () => {
    const { id } = this.state;
    const localKeys = JSON.parse(localStorage.getItem('cartItems'));
    if (localKeys) {
      if (localKeys.every((e) => e.id !== id)) this.setSaveCard();
    } else {
      localStorage.setItem('cartItems', JSON.stringify([]));
      this.setSaveCard();
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
      },
      load,
    } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
        {load
          && (
            <div className="product" data-testid="product">
              <h2
                data-testid="product-detail-name"
              >
                { title }
              </h2>
              <img src={ thumbnail } alt={ title } />
              <p>
                R$:
                { price }
              </p>
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ this.saveCartItems }
              >
                Adicionar ao carrinho
              </button>
            </div>
          )}
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
