import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: true,
    };

    this.getUserName = this.getUserName.bind(this);
  }

  async getUserName() {
    const user = await getUser();
    this.setState({
      name: user.name,
      isLoading: false,
    });
  }

  render() {
    this.getUserName();

    const { isLoading, name } = this.state;

    return (
      <header data-testid="header-component">
        {isLoading ? <Loading /> : (
          <>
            <h1>Trybetunes</h1>
            <h2
              className="user-name"
              data-testid="header-user-name"
            >
              { name }
            </h2>
          </>
        )}
      </header>
    );
  }
}

export default Header;
