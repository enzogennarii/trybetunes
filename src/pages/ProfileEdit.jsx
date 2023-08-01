import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import EditProfileForm from '../components/EditProfileForm';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      user: {},
    };

    this.getUserData = this.getUserData.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.redirectToProfilePage = this.redirectToProfilePage.bind(this);
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

  startLoading() {
    this.setState({
      isLoading: true,
    });
  }

  redirectToProfilePage() {
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const { isLoading, user } = this.state;

    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        <h1>ProfileEdit</h1>
        { isLoading ? <Loading /> : (
          <EditProfileForm
            user={ user }
            startLoading={ this.startLoading }
            redirect={ this.redirectToProfilePage }
          />
        ) }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
