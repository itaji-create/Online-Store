import React from 'react';
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
      <div>
        {load && (
          elements.map((e) => (
            <label key={ e.id } htmlFor={ e.name } data-testid="category">
              { e.name }
              <input
                id={ e.name }
                type="radio"
              />
            </label>
          ))
        )}
      </div>
    );
  }
}

export default Category;
