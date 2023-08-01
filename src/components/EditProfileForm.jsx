import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';
import { updateUser } from '../services/userAPI';

class EditProfileForm extends Component {
  constructor({ user }) {
    super();

    this.state = {
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      isBtnDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.isSaveBtnDisabled = this.isSaveBtnDisabled.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
  }

  componentDidMount() {
    this.isSaveBtnDisabled();
  }

  componentDidUpdate(_pProps, pState) {
    const { name, email, description, image } = this.state;

    if (pState.name !== name || pState.email !== email
      || pState.description !== description || pState.image !== image) {
      this.isSaveBtnDisabled();
    }
  }

  handleInputChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  isSaveBtnDisabled() {
    const { name, email, description, image } = this.state;

    const data = [name, email, description, image];
    const isSomeDataEmpty = data.some((d) => d === '');
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailInvalid = !regexEmail.test(email);

    this.setState({
      isBtnDisabled: isSomeDataEmpty || isEmailInvalid,
    });
  }

  async applyChanges() {
    const { startLoading, redirect } = this.props;
    startLoading();

    const { name, email, description, image } = this.state;
    const updatedProfile = { name, email, description, image };
    await updateUser(updatedProfile);
    redirect();
  }

  render() {
    const { name, email, description, image, isBtnDisabled } = this.state;

    return (
      <form>
        <Input
          id="edit-input-name"
          name="name"
          onChange={ this.handleInputChange }
          value={ name }
        />
        <Input
          id="edit-input-email"
          name="email"
          onChange={ this.handleInputChange }
          value={ email }
        />
        <textarea
          data-testid="edit-input-description"
          name="description"
          onChange={ this.handleInputChange }
          value={ description }
        />
        <Input
          id="edit-input-image"
          name="image"
          onChange={ this.handleInputChange }
          value={ image }
        />
        <Button
          disabled={ isBtnDisabled }
          id="edit-button-save"
          onClick={ this.applyChanges }
          text="Salvar"
        />
      </form>
    );
  }
}

EditProfileForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
}.isRequired;

export default EditProfileForm;
