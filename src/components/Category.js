import React from 'react';
import '../App.css';
import { getCategories } from '../services/api';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      load: false,
    };
  }

  componentDidMount() {
    getCategories().then((data) => {
      this.setState({ elements: data, load: true });
    });
  }

  render() {
    const { elements, load } = this.state;
    return (
      <div className="categoryPage">
        {load && (
          elements.map((e) => (
            <div key={ e.id }>
              <label htmlFor={ e.name } data-testid="category">
                <input
                  id={ e.name }
                  type="radio"
                />
                { e.name }
              </label>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Category;
