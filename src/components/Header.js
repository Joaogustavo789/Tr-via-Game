import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../img/trivia.png';
import '../style/Header.css';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <div>
        <header className="container-header">
          <div className="container-name">
            <h2 data-testid="header-player-name">
              {name}
            </h2>
            <img
              src={ gravatarEmail }
              alt="Foto perfil"
              data-testid="header-profile-picture"
              className="img-gravatar"
            />
          </div>
          <img src={ logo } className="App-logo logo-header" alt="logo" />
          <div>
            <span className="score">Score</span>
            <h2 data-testid="header-score" className="score">{score}</h2>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
