import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Products from './Products';

class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      load: false,
      inputText: '',
      category: '',
      products: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.requestProducts = this.requestProducts.bind(this);
    this.saveCartItems = this.saveCartItems.bind(this);
  }

  componentDidMount() {
    getCategories().then((data) => {
      this.setState({ categories: data, load: true });
    });
  }

  handleChange({ target: { value, type, id } }) {
    if (type === 'radio') {
      this.setState({ category: id });
      this.requestProducts();
    } else {
      this.setState({ inputText: value });
    }
  }

  requestProducts() {
    const { inputText, category } = this.state;
    getProductsFromCategoryAndQuery(category, inputText)
      .then((data) => {
        this.setState({ products: data.results, showProducts: true });
      });
  }

  saveCartItems({ target: { id } }) {
    const { products } = this.state;
    const result = products.find((e) => e.id === id);
    const localKeys = JSON.parse(localStorage.getItem('cartItems'));
    if (localKeys) {
      if (localKeys.every((e) => e.id !== id)) {
        localStorage.setItem('cartItems', JSON.stringify([...localKeys, result]));
      }
    } else {
      localStorage.setItem('cartItems', JSON.stringify([]));
      localStorage.setItem('cartItems', JSON.stringify([...localKeys, result]));
    }
  }

  render() {
    const { load, categories, inputText, products, showProducts } = this.state;
    return (
      <div className="page">
        {load && (
          <div className="categoryPage">
            {categories.map((e) => (
              <Category
                key={ e.id }
                change={ this.handleChange }
                id={ e.id }
                name={ e.name }
              />
            ))}
          </div>
        )}
        <section>
          <div className="searchSection">
            <h1
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>
            <input
              className="textInput"
              data-testid="query-input"
              type="text"
              placeholder="Pesquise produto"
              onChange={ this.handleChange }
              value={ inputText }
            />
            <button
              className="buttonInput"
              type="button"
              data-testid="query-button"
              onClick={ this.requestProducts }
            >
              Pesquisar
            </button>
            <Link
              style={ { backgroundColor: 'red' } }
              data-testid="shopping-cart-button"
              to="/carrinho"
            >
              Carrinho
            </Link>
          </div>
          {showProducts && (
            products.length > 0 ? (
              <div className="productsPage">
                {products.map((e) => (
                  <Products
                    obj={ e }
                    key={ e.id }
                    title={ e.title }
                    image={ e.thumbnail }
                    price={ e.price }
                    id={ e.id }
                    handleClick={ this.saveCartItems }
                  />
                ))}
              </div>
            )
              : (
                <p>Nenhum produto foi encontrado</p>
              )
          )}
        </section>
      </div>
    );
  }
}

export default SearchInput;
