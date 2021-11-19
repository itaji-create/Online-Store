import React from 'react';
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
  }

  componentDidMount() {
    this.productDetails();
  }

  productDetails() {
    const { id } = this.state;
    getProductsById(id).then((data) => {
      this.setState({
        productInfo: data,
        load: true,
      });
      console.log(this.state);
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
        {load
          && <Products
            id={ id }
            title={ title }
            image={ thumbnail }
            price={ price }
          />}
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.string.isRequired,
  }).isRequired,
};

export default ProductDetail;
