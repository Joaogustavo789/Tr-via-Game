import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../img/trivia.png';
import meme from '../img/pinpng.com-meme-faces-png-14645.png';

class Settings extends Component {
  render() {
    const { history: { push } } = this.props;
    return (
      <div className="container-game">
        <img src={ logo } className="App-logo logo-rank" alt="logo" />
        <div className="container-main">
          <h1 data-testid="settings-title" className="title-settings">Settings</h1>
          <h2 className="coming">Coming Soon...</h2>
          <img className="meme" src={ meme } alt="meme" />
          <button
            type="button"
            onClick={ () => {
              push('/');
            } }
            className="btn-home"
          >
            Home

          </button>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Settings;
