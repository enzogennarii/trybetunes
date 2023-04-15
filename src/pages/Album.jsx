import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import AlbumItem from '../components/AlbumItem';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      collection: [],
      tracks: [],
    };

    this.getCollectionData = this.getCollectionData.bind(this);
  }

  componentDidMount() {
    this.getCollectionData();
  }

  async getCollectionData() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);

    this.setState({
      collection: data.filter((obj) => obj.wrapperType === 'collection')[0],
      tracks: data.filter((obj) => obj.wrapperType === 'track'),
    });
  }

  render() {
    const { collection, tracks } = this.state;
    console.log(tracks);

    return (
      <div className="page-album" data-testid="page-album">
        <Header />

        <section className="album-content">
          <section className="album-section">
            <AlbumItem collection={ collection } />
          </section>
          <section className="tracks-section">
            <MusicCard tracks={ tracks } />
          </section>
        </section>
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
