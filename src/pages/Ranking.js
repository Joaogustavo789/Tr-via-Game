import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history: { push } } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => push('/') }
        >
          home

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
