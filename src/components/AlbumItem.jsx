import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumItem extends Component {
  render() {
    const { collection } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = collection;

    return (
      <li className="collection" key={ collectionId }>
        <img
          alt={ `Capa do álbum ${collectionName}` }
          className="collection-image"
          src={ artworkUrl100 }
        />
        <p data-testid="album-name" className="collection-name">{ collectionName }</p>
        <p data-testid="artist-name" className="artist-name">{ artistName }</p>
      </li>
    );
  }
}

AlbumItem.propTypes = {
  collection: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbumItem;
