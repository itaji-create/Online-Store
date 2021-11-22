import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { name, change, id } = this.props;
    return (
      <div style={ { backgroundColor: 'whitesmoke' } }>
        <label
          style={ { backgroundColor: 'whitesmoke' } }
          htmlFor={ id }
          data-testid="category"
        >
          <input
            id={ id }
            type="radio"
            name="selected"
            onChange={ change }
          />
          { name }
        </label>
      </div>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default Category;
