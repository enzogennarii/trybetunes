import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
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

    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        <h1>Profile</h1>
        {isLoading ? <Loading />
          : (
            <div>
              <img src={ image } alt="Avatar do usuário" data-testid="profile-image" />
              <p>{ name }</p>
              <p>{ email }</p>
              <p>{ description }</p>
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
