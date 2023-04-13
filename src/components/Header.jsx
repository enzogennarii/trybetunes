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
            <section className="main-header">
              <h1>Trybetunes</h1>
              <h3
                className="user-name"
                data-testid="header-user-name"
              >
                { name }
              </h3>
            </section>
            <section className="navigation">
              <Link to="/search" data-testid="link-to-search">
                <h2>Pesquisa</h2>
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                <h2>Favoritas</h2>
              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                <h2>Perfil</h2>
              </Link>
            </section>
          </>
        )}
      </header>
    );
  }
}

export default Header;
