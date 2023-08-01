import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disableBtn: true,
      isLoading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    const minCharLength = 3;

    this.setState({
      [name]: value,
      disableBtn: (value.length < minCharLength),
    });
  }

  async handleClickLogin() {
    const { history } = this.props;

    this.setState({
      isLoading: true,
    });

    const { name } = this.state;
    const user = { name };
    await createUser(user);

    history.push('/search');
  }

  render() {
    const { disableBtn, isLoading, name } = this.state;

    return (
      <div className="login-page" data-testid="page-login">
        {isLoading ? <Loading /> : (
          <section className="login-section">
            <h1>Login</h1>
            <Input
              id="login-name-input"
              name="name"
              onChange={ this.handleInputChange }
              placeholder="Qual é o seu nome?"
              type="text"
              value={ name }
            />
            <Button
              disabled={ disableBtn }
              id="login-submit-button"
              onClick={ this.handleClickLogin }
              text="Entrar"
            />
          </section>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
