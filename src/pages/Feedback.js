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
    return (
      <div>
        <Header />
        Feedback
        <p data-testid="feedback-text">{ this.feedback() }</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertionsNumber: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertionsNumber: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
