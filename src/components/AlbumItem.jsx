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
        <p className="collection-name">{ collectionName }</p>
        <p className="artist-name">{ artistName }</p>
      </li>
    );
  }
}

AlbumItem.propTypes = {
  collection: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumItem;
