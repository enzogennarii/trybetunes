import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoritedTracks: [],
      isLoading: false,
    };

    this.getFavoritedTracks = this.getFavoritedTracks.bind(this);
    this.onUnfavorite = this.onUnfavorite.bind(this);
  }

  componentDidMount() {
    this.getFavoritedTracks();
  }

  async onUnfavorite({ target }) {
    this.setState({
      isLoading: true,
    });

    const { favoritedTracks } = this.state;
    const trackID = Number(target.value);
    const trackObj = favoritedTracks.find((t) => t.trackId === trackID);
    await removeSong(trackObj);
    const newFavorites = await getFavoriteSongs();

    this.setState({
      isLoading: false,
      favoritedTracks: newFavorites,
    });
  }

  async getFavoritedTracks() {
    this.setState({ isLoading: true });

    const favorites = await getFavoriteSongs();
    this.setState({
      favoritedTracks: favorites,
      isLoading: false,
    });
  }

  render() {
    const { favoritedTracks, isLoading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        { isLoading ? <Loading />
          : (
            <MusicCard
              favorites={ favoritedTracks }
              onFavorite={ this.onUnfavorite }
              tracks={ favoritedTracks }
            />
          ) }
      </div>
    );
  }
}

export default Favorites;
