import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import AlbumItem from '../components/AlbumItem';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      collection: [],
      tracks: [],
      favoriteIsLoading: false,
      favoriteSongs: [],
    };

    this.getCollectionData = this.getCollectionData.bind(this);
    this.onFavorite = this.onFavorite.bind(this);
    this.getFavoritesSongs = this.getFavoritesSongs.bind(this);
  }

  componentDidMount() {
    this.getCollectionData();
    this.getFavoritesSongs();
  }

  async onFavorite({ target }) {
    this.setState({
      favoriteIsLoading: true,
    });

    const { tracks } = this.state;
    const trackID = Number(target.value);
    const trackObj = tracks.find((track) => track.trackId === trackID);
    await addSong(trackObj);

    const favorites = await getFavoriteSongs();

    this.setState({
      favoriteIsLoading: false,
      favoriteSongs: favorites,
    });
  }

  async getCollectionData() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);

    this.setState({
      collection: data.find((obj) => obj.wrapperType === 'collection'),
      tracks: data.filter((obj) => obj.wrapperType === 'track'),
    });
  }

  async getFavoritesSongs() {
    const favorites = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favorites,
    });
  }

  render() {
    const { collection, favoriteIsLoading, favoriteSongs, tracks } = this.state;
    console.log(favoriteSongs);

    return (
      <div className="page-album" data-testid="page-album">
        <Header />

        {favoriteIsLoading ? <Loading /> : (
          <section className="album-content">
            <section className="album-section">
              <AlbumItem collection={ collection } />
            </section>
            <section className="tracks-section">
              <MusicCard tracks={ tracks } onFavorite={ this.onFavorite } />
            </section>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
