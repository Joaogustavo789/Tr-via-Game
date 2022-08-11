import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScoreAction } from '../redux/actions/index';
import logo from '../img/trivia.png';
import '../style/Ranking.css';

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
      <div className="container-game">
        <img src={ logo } className="App-logo logo-rank" alt="logo" />
        <div className="container-main">
          <h2 data-testid="ranking-title" className="category">Ranking</h2>
          <div className="scroll">
            <table>

              <th className="title-table">Imagem</th>
              <th className="title-table">Name</th>
              <th className="title-table">Score</th>

              <tbody>
                {
                  rank.map((person, index) => (
                    <tr key={ person.name }>
                      <td>
                        <img
                          src={ person.picture }
                          alt="Foto da pessoa"
                          className="img-table"
                        />

                      </td>
                      <td
                        data-testid={ `player-name-${index}` }
                        className="info"
                      >
                        {person.name}

                      </td>
                      <td
                        data-testid={ `player-score-${index}` }
                        className="info"
                      >
                        {person.score}

                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => {
              resetScore();
              push('/');
            } }
            className="btn-home"
          >
            Home

          </button>
        </div>
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
