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
          <header>
            <h1
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>
            <input
              data-testid="query-input"
              type="text"
              placeholder="Pesquise produto"
              onChange={ this.handleChange }
              value={ inputText }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.requestProducts }
            >
              Pesquisar
            </button>
            <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
          </header>
          {showProducts && (
            products.length > 0 ? (
              <div className="productsPage">
                {products.map((e) => (
                  <Products
                    key={ e.id }
                    title={ e.title }
                    image={ e.thumbnail }
                    price={ e.price }
                    id={ e.id }
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
