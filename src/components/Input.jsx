import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { id, name, onChange, placeholder, type, value } = this.props;

    return (
      <input
        className={ id }
        data-testid={ id }
        id={ id }
        name={ name }
        onChange={ onChange }
        placeholder={ placeholder }
        type={ type }
        value={ value }
      />
    );
  }
}

Input.defaultProps = {
  id: '',
  name: '',
  onChange: () => {},
  placeholder: '',
  type: 'text',
  value: '',
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
