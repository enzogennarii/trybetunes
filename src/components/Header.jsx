import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
            <Link to="/search" data-testid="link-to-search">
              <p>Search</p>
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <p>Favorites</p>
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <p>Profile</p>
            </Link>
          </>
        )}
      </header>
    );
  }
}

export default Header;
