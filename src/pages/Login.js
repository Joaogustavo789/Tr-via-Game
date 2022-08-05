import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { apiTriviaToken } from '../service/apiTrivia';

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

  render() {
    const { playerName, playerEmail } = this.state;
    const { history } = this.props;
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
              history.push('/game');
            } }
            disabled={ this.verifyInputs() }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
