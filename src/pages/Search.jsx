import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import AlbumItem from '../components/AlbumItem';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistSearched: '',
      disableSearchBtn: true,
      isSearchLoading: false,
      searchInput: '',
      searchResults: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchBtn = this.handleSearchBtn.bind(this);
  }

  // Função genérica para pegar o input de pesquisa
  handleInputChange({ target }) {
    const { name, value } = target;
    const minCharLength = 2;

    this.setState({
      [name]: value,
      disableSearchBtn: (value.length < minCharLength),
    });
  }

  // Função de evento de clique no botão de pesquisa
  handleSearchBtn() {
    const { searchInput } = this.state;
    const artist = searchInput;

    this.setState({
      artistSearched: artist,
      searchInput: '',
      isSearchLoading: true,
    }, this.getResultsOfSearch);
  }

  // Função que guarda os resultados da pesquisa no state.searchResults
  async getResultsOfSearch() {
    const { artistSearched } = this.state;

    this.setState({
      isSearchLoading: false,
      searchResults: await searchAlbumsAPI(artistSearched),
    });
  }

  render() {
    const {
      artistSearched,
      disableSearchBtn,
      isSearchLoading,
      searchInput,
      searchResults,
    } = this.state;

    return (
      <div className="page-search" data-testid="page-search">
        <Header />
        <section className="search-content">
          {isSearchLoading ? <Loading /> : (
            <>
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
                onClick={ this.handleSearchBtn }
                text="Procurar"
              />
            </>
          )}
        </section>
        {!(searchResults.length) ? (
          <section className="search-results">
            <h3>Nenhum álbum foi encontrado</h3>
          </section>
        ) : (
          <section className="search-results">
            <h3>{`Resultado de álbuns de: ${artistSearched}`}</h3>
            <ul className="collection-list">
              {searchResults.map((result) => (
                <Link
                  data-testid={ `link-to-album-${result.collectionId}` }
                  key={ result.collectionId }
                  to={ `/album/${result.collectionId}` }
                >
                  <AlbumItem collection={ result } />
                </Link>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }
}

export default Search;
