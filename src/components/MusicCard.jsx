import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { tracks } = this.props;

    return (
      <ul>
        {tracks.map((track) => (
          <li key={ track.trackId }>
            <p>{track.trackName}</p>
            <audio
              data-testid="audio-component"
              src={ track.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
          </li>
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MusicCard;
