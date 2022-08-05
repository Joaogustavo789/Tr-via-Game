import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      playerEmail: '',
    };
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
    const { history: { push } } = this.props;
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
            onClick={ () => {} }
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
  }).isRequired,
};

export default Login;
