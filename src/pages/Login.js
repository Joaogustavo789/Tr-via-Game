import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { apiTriviaToken } from '../service/apiTrivia';
import { saveNameAction, requireGravatarAction } from '../redux/actions/index';

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
      <div>
        <form>
          <input
            placeholder="Digite seu nome"
            type="text"
            data-testid="input-player-name"
            name="playerName"
            value={ playerName }
            onChange={ this.handleChange }
          />
          <input
            placeholder="Digite seu e-mail"
            type="email"
            data-testid="input-gravatar-email"
            name="playerEmail"
            value={ playerEmail }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            onClick={ () => {
              this.saveTokenToLocal();
              requireGravatar(this.convertEmail());
              saveName(playerName);
              push('/game');
            } }
            disabled={ this.verifyInputs() }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => push('/settings') }
          >
            Configurações
          </button>
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
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveName: (name) => dispatch(saveNameAction(name)),
  requireGravatar: (hashEmail) => dispatch(requireGravatarAction(hashEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
