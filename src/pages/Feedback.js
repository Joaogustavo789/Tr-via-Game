import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { history: { push } } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        Feedback
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => push('/') }
        >
          Play Again

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => push('/ranking') }
        >
          Ranking

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Feedback;
