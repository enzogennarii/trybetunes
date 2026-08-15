import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div className="page-not-found" data-testid="page-not-found">
        <p className="not-found-code">404</p>
        <p className="not-found-text">Página não encontrada</p>
      </div>
    );
  }
}

export default NotFound;
