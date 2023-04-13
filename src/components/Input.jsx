import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { id, name, onChange, type, value } = this.props;

    return (
      <input
        className={ id }
        data-testid={ id }
        id={ id }
        name={ name }
        onChange={ onChange }
        type={ type }
        value={ value }
      />
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
