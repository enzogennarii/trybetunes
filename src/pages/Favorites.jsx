import React, { Component } from 'react';
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

  renderContent() {
    const { favoritedTracks, isLoading } = this.state;

    if (isLoading) return <Loading />;
    if (!favoritedTracks.length) {
      return <p className="empty-state">Nenhuma música favoritada ainda.</p>;
    }

    return (
      <MusicCard
        favorites={ favoritedTracks }
        onFavorite={ this.onUnfavorite }
        tracks={ favoritedTracks }
      />
    );
  }

  render() {
    return (
      <div className="page-favorites" data-testid="page-favorites">
        <h1 className="page-title">Favoritas</h1>
        { this.renderContent() }
      </div>
    );
  }
}

export default Favorites;
