import React, { Component } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      disableSearchBtn: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    const minCharLength = 2;

    this.setState({
      [name]: value,
      disableSearchBtn: (value.length < minCharLength),
    });
  }

  render() {
    const { disableSearchBtn, searchInput } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <Input
          id="search-artist-input"
          name="searchInput"
          onChange={ this.handleInputChange }
          placeholder="Nome do artista"
          type="text"
          value={ searchInput }
        />
        <Button
          disabled={ disableSearchBtn }
          id="search-artist-button"
          onClick={ () => {} }
          text="Procurar"
        />
      </div>
    );
  }
}

export default Search;
