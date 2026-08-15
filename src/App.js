import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route path="/">
            <Header />
            <Switch>
              <Route path="/profile/edit" component={ ProfileEdit } />
              <Route path="/profile" component={ Profile } />
              <Route path="/favorites" component={ Favorites } />
              <Route path="/album/:id" component={ Album } />
              <Route path="/search" component={ Search } />
              <Route component={ NotFound } />
            </Switch>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
