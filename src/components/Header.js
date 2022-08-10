import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <div>
        <header>
          <img
            src={ gravatarEmail }
            alt="Foto perfil"
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">{name}</h2>
          <h2 data-testid="header-score">{score}</h2>
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
