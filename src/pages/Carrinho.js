import React from 'react';
import PropTypes from 'prop-types';

class Carrinho extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      products: '',
      minValue: 1,
      product: location.ItensCart,
    };
    this.deleteCard = this.deleteCard.bind(this);
    this.changeQtd = this.changeQtd.bind(this);
    this.loadFunc = this.loadFunc.bind(this);
  }

  componentDidMount() {
    this.loadFunc();
  }

  loadFunc() {
    const { product } = this.state;
    const items = JSON.parse(localStorage.getItem('cartItems'));
    if (product !== undefined) {
      this.setState({ products: [product] });
    } else if (items) {
      this.setState({ products: [...items] });
    }
  }

  deleteCard({ target }) {
    const { products } = this.state;
    const name = target.parentNode.parentNode.firstChild.innerText;
    const i = products.findIndex((card) => card.title === name);
    products.splice(i, 1);
    this.setState({ products });
    localStorage.setItem('cartItems', JSON.stringify([...products]));
    console.log(this.state);
  }

  changeQtd({ target }) {
    const operator = target.id;
    const { carrinho } = this.state;
    const name = target.parentNode.parentNode.firstChild.innerText;
    const i = carrinho.findIndex((e) => e.id === name);
    console.log(this.state);
    if (operator === '+') {
      carrinho[i].qtd += 1;
      this.setState({ carrinho });
      localStorage.setItem('cartItems', JSON.stringify([...carrinho]));
    } else {
      if (carrinho[i].qtd >= 1) carrinho[i].qtd -= 1;
      this.setState({ carrinho });
      localStorage.setItem('cartItems', JSON.stringify([...carrinho]));
    }
  }

  render() {
    const { products, minValue } = this.state;
    return (
      <div>
        {products !== null && products.length > 0 ? (
          products.map((product) => (
            <div
              data-testid="shopping-cart-button"
              key={ product.id }
              className="product"
            >
              <h4 data-testid="shopping-cart-product-name">{ product.title }</h4>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>
                <i>R$:</i>
                { product.price }
              </p>
              <p data-testid="shopping-cart-product-quantity">
                <i>Qtd.</i>
                { minValue }
              </p>
              <div>
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
                <button type="button" onClick={ this.deleteCard }>remover</button>
              </div>
            </div>
          ))
        )
          : (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)}
      </div>
    );
  }
}
//   render() {
//     const { carrinho, total } = this.state;
//     return (
//       <div>
//         {carrinho !== null ? (
//           carrinho.map((item) => (
//             <div key={ item.id }>
//               <p>{ item.id }</p>
//               <h3
//                 data-testid="shopping-cart-product-name"
//               >
//                 {item.title}
//               </h3>
//               <img src={ item.thumbnail } alt={ item.title } />
//               <p>
//                 <i>R$: </i>
//                 { item.price }
//               </p>
//             </div>
//           ))
//         )
//           : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
//         <div>
//           <h2>Resumo do pedido</h2>
//           <h3>
//             <i>Total: </i>
//             { total }
//           </h3>
//           <button type="button">Continuar</button>
//         </div>
//       </div>
// );

Carrinho.propTypes = {
  location: PropTypes.shape({
    ItensCart: PropTypes.shape({}),
  }).isRequired,
};

export default Carrinho;
