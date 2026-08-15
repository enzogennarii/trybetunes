import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { id, legend, name, onChange, placeholder, type, value } = this.props;

    const input = (
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

    if (!legend) return input;

    return (
      <label htmlFor={ id }>
        { legend }
        { input }
      </label>
    );
  }
}

Input.defaultProps = {
  id: '',
  legend: '',
  name: '',
  onChange: () => {},
  placeholder: '',
  type: 'text',
  value: '',
};

Input.propTypes = {
  id: PropTypes.string,
  legend: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
