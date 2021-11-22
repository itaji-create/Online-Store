import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  render() {
//fatorar
    const { title, image, price, obj } = this.props;
    const { title, image, price, id, handleClick } = this.props;
//fatorar
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
        //fatorar
        <Link
          data-testid="product-add-to-cart"
          to={ {
            pathname: '/carrinho',
            ItensCart: obj,
          } }
        >
          Adicionar ao Carrinho
        </Link>

        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ handleClick }
        >
          Adicionar ao carrinho
        </button>
//fatorar
      </div>
    );
  }
}

Products.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  //fatorar

  obj: PropTypes.PropTypes.objectOf(PropTypes.object()).isRequired,

  handleClick: PropTypes.func.isRequired,

//fatorar
};

export default Products;
