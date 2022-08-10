import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetScoreAction } from '../redux/actions/index';

class Feedback extends Component {
  componentDidMount() {
    this.saveInfoLocal();
  }

  feedback = () => {
    const { assertionsNumber } = this.props;
    if (assertionsNumber < +'3') {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  saveInfoLocal = () => {
    const { score, name, gravatarEmail } = this.props;
    const objRank = {
      name,
      score,
      picture: gravatarEmail,
    };
    let rank = [];
    rank.push(objRank);
    rank = rank.concat(JSON.parse(localStorage.getItem('ranking') || '[]'));
    const rankOrd = rank.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('ranking', JSON.stringify(rankOrd));
  }

  render() {
    const { score, assertionsNumber, history: { push }, resetScore } = this.props;
    return (
      <div>
        <Header />
        Feedback
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertionsNumber}</h2>
        <p data-testid="feedback-text">{ this.feedback() }</p>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            resetScore();
            push('/');
          } }
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
  assertionsNumber: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  assertionsNumber: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
