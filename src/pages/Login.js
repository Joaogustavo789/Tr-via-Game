import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import logo from '../img/trivia.png';
import { apiTriviaToken } from '../service/apiTrivia';
import { saveNameAction, requireGravatarAction } from '../redux/actions/index';
import '../style/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      playerEmail: '',
    };
  }

  saveTokenToLocal = async () => {
    const response = await apiTriviaToken();
    localStorage.setItem('token', response);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyInputs = () => {
    const minLength = 3;
    const { playerName, playerEmail } = this.state;
    const validEmail = (/\S+@\S+\.\S+/).test(playerEmail);
    return !(playerName.length >= minLength && validEmail);
  }

  convertEmail = () => {
    const { playerEmail } = this.state;
    return md5(playerEmail).toString();
  }

  render() {
    const { playerName, playerEmail } = this.state;
    const { history: { push }, saveName, requireGravatar } = this.props;
    return (
      <div className="container-login">
        <header className="App-header">
          <img src={ logo } className="App-logo logo-login" alt="logo" />
        </header>
        <span className="container-form">.</span>
        <form className="container-input">
          <h2 className="title-login">LOGIN</h2>
          <input
            placeholder="Name"
            type="text"
            data-testid="input-player-name"
            name="playerName"
            value={ playerName }
            onChange={ this.handleChange }
            className="input-login"
          />
          <input
            placeholder="Email"
            type="email"
            data-testid="input-gravatar-email"
            name="playerEmail"
            value={ playerEmail }
            onChange={ this.handleChange }
            className="input-login"
          />
          <div className="container-button">
            <button
              type="button"
              data-testid="btn-play"
              onClick={ async () => {
                await this.saveTokenToLocal();
                requireGravatar(this.convertEmail());
                saveName(playerName);
                push('/game');
              } }
              disabled={ this.verifyInputs() }
              className="btn-login"
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => push('/settings') }
              className="btn-login"
            >
              Settings
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  saveName: PropTypes.func,
  requireGravatar: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveName: (name) => dispatch(saveNameAction(name)),
  requireGravatar: (hashEmail) => dispatch(requireGravatarAction(hashEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
