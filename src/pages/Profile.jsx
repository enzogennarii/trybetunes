import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import getGravatarUrl from '../services/gravatar';
import Loading from '../components/Loading';
import Button from '../components/Button';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      user: {},
    };

    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    this.setState({ isLoading: true });

    const userData = await getUser();
    this.setState({
      isLoading: false,
      user: userData,
    });
  }

  render() {
    const { isLoading, user } = this.state;
    const { name, email, image, description } = user;
    const avatarUrl = image || getGravatarUrl(email);

    return (
      <div data-testid="page-profile" className="page-profile">
        <h1 className="page-title">Perfil</h1>
        {isLoading ? <Loading />
          : (
            <div className="profile-content">
              <img
                className="profile-avatar"
                src={ avatarUrl }
                alt="Avatar do usuário"
                data-testid="profile-image"
              />
              <p className="profile-name">{ name }</p>
              <p className="profile-email">{ email }</p>
              <p className="profile-description">{ description }</p>
              <Link to="/profile/edit">
                <Button
                  id="edit-profile-btn"
                  text="Editar perfil"
                />
              </Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
