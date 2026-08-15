import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import getGravatarUrl from '../services/gravatar';
import Loading from './Loading';
import logo from '../assets/logo.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      isLoading: true,
    };

    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    // O Header monta uma única vez (para não recarregar a cada navegação),
    // então precisa buscar o usuário de novo ao sair da tela de edição de perfil,
    // caso o nome/foto tenham sido alterados lá.
    if (prevProps.location.pathname === '/profile/edit'
      && location.pathname !== prevProps.location.pathname) {
      this.getUserName();
    }
  }

  async getUserName() {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, email, image, name } = this.state;
    const avatarUrl = image || getGravatarUrl(email);

    return (
      <header className="header" data-testid="header-component">
        {isLoading ? <Loading /> : (
          <>
            <section className="main-header">
              <img
                className="logo"
                src={ logo }
                alt="logo"
              />
            </section>
            <section className="navigation">
              <NavLink
                activeClassName="navigation-link-active"
                data-testid="link-to-search"
                to="/search"
              >
                <h2 className="navigation-item">Pesquisa</h2>
              </NavLink>
              <NavLink
                activeClassName="navigation-link-active"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                <h2 className="navigation-item">Favoritas</h2>
              </NavLink>
              <NavLink
                activeClassName="navigation-link-active"
                data-testid="link-to-profile"
                to="/profile"
              >
                <h2 className="navigation-item">Perfil</h2>
              </NavLink>
            </section>
            <section className="user-icon">
              <img className="user-photo" src={ avatarUrl } alt="" />
              <h3
                className="user-name"
                data-testid="header-user-name"
              >
                { name }
              </h3>
            </section>
          </>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Header);
