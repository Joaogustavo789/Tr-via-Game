import React from 'react';
import PropTypes from 'prop-types';
import { apiTrivia } from '../service/apiTrivia';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      resultsTriviaApi: [],
      indexQuestion: 0,
    };
  }

  componentDidMount() {
    this.getTriviaApi();
  }

  getTriviaApi = async () => {
    const { history: { push } } = this.props;
    const returnTriviaApi = await apiTrivia();
    if (returnTriviaApi) {
      this.setState({
        resultsTriviaApi: returnTriviaApi,
      });
    } else {
      push('/');
    }
  }

  render() {
    const { resultsTriviaApi, indexQuestion } = this.state;
    const newArray = [];
    return (
      <main>
        { resultsTriviaApi.length > 0
        && (
          <section>
            <h1 data-testid="question-category">
              {
                `Category: ${resultsTriviaApi[indexQuestion].category}`
              }
            </h1>
            <h2 data-testid="question-text">
              { resultsTriviaApi[indexQuestion].question }
            </h2>
            <div>
              {  }
            </div>
          </section>
        )}
      </main>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Game;
