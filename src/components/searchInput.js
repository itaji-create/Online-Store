import React from 'react';

class SearchInput extends React.Component {
  render() {
    return (
      <section>
        <input type="text" placeholder="Pesquise produto" />
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </section>
    );
  }
}

export default SearchInput;
