import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { favorites, onFavorite, tracks } = this.props;

    const verifyIfIsFavorited = (id) => favorites.some((music) => music.trackId === id);

    return (
      <ul className="tracks-list">
        {tracks.map((track) => (
          <li className="track" key={ track.trackId }>
            <p className="track-name">{track.trackName}</p>
            <audio
              data-testid="audio-component"
              src={ track.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
            <label htmlFor="checkbox-favorite">
              <input
                checked={ verifyIfIsFavorited(track.trackId) }
                data-testid={ `checkbox-music-${track.trackId}` }
                type="checkbox"
                value={ track.trackId }
                onChange={ onFavorite }
                id="checkbox-favorite"
              />
              Favorita
            </label>
          </li>
        ))}
      </ul>
    );
  }
}

MusicCard.defaultProps = {
  favorites: [],
};

MusicCard.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({})),
  onFavorite: PropTypes.func.isRequired,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MusicCard;
