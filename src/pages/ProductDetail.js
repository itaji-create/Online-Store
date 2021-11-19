import React from 'react';
import Proptypes from 'prop-types';
import { Circles } from 'react-loading-icons';
import { getProductsById } from '../services/api';
import Products from '../components/Products';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      productInfo: [],
      load: false,
    };
    this.productDetails = this.productDetails.bind(this);
  }

  componentDidMount() {
    this.productDetails();
  }

  async productDetails() {
    const {
      match: {
        info: {
          id,
        },
      } } = this.props;
    this.setState({
      load: true }, async () => {
      const produto = await getProductsById(id);
      this.setState({
        productInfo: produto,
        load: false,
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
      <div data-testid="product-detail-name">
        { load ? <Circles /> : (
          <div>
            <Products title={ title } image={ thumbnail } price={ price } />
          </div>
        )}

      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: Proptypes.shape({
    info: Proptypes.shape({
      id: Proptypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetail;
