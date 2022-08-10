import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScoreAction } from '../redux/actions/index';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      rank: [],
    };
  }

  componentDidMount() {
    this.setState({
      rank: this.getInfoLocal(),
    });
  }

  getInfoLocal = () => JSON.parse(localStorage.getItem('ranking'))
    .sort((a, b) => b.score - a.score)

  render() {
    const { history: { push }, resetScore } = this.props;
    const { rank } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              rank.map((person, index) => (
                <tr key={ person.name }>
                  <td><img src={ person.picture } alt="Foto da pessoa" /></td>
                  <td data-testid={ `player-name-${index}` }>{person.name}</td>
                  <td data-testid={ `player-score-${index}` }>{person.score}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            resetScore();
            push('/');
          } }
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

const mapStateToProps = (state) => ({
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
