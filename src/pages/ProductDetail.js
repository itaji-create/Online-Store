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
      qtd: 1,
    };
    this.productDetails = this.productDetails.bind(this);
    this.saveCartItems = this.saveCartItems.bind(this);
    this.setSaveCard = this.setSaveCard.bind(this);
    this.changeQtd = this.changeQtd.bind(this);
  }

  componentDidMount() {
    this.productDetails();
  }

  setSaveCard() {
    const { productInfo: { title, thumbnail, price }, id, qtd } = this.state;
    const result = { title, thumbnail, price, id, qtd };
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

  changeQtd({ target }) {
    const operator = target.id;
    const { qtd } = this.state;
    if (operator === '+') {
      this.setState({ qtd: qtd + 1 });
    }
    if (qtd >= 1 && operator === '-') {
      this.setState({ qtd: qtd - 1 });
    }
  }

  render() {
    const {
      productInfo: {
        title,
        thumbnail,
        price,
      },
      load,
      qtd,
    } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
        {load
          && (
            <div>
              <div className="product" data-testid="product">
                <h2
                  data-testid="product-detail-name"
                >
                  { title }
                </h2>
                <img src={ thumbnail } alt={ title } />
                <p>
                  <i>R$: </i>
                  { price }
                </p>
                <div>
                  <p data-testid="shopping-cart-product-quantity">
                    <i>Qtd: </i>
                    { qtd }
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
                  <button
                    type="button"
                    data-testid="product-detail-add-to-cart"
                    onClick={ this.saveCartItems }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
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
