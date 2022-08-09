import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  feedback = () => {
    const { assertionsNumber } = this.props;
    if (assertionsNumber < +'3') {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    const { score, assertionsNumber } = this.props;
    return (
      <div>
        <Header />
        Feedback
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertionsNumber}</h2>
        <p data-testid="feedback-text">{ this.feedback() }</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertionsNumber: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertionsNumber: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
