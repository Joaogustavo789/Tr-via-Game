import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiTrivia } from '../service/apiTrivia';
import Header from '../components/Header';
import { saveScoreAction, feedbackScoreAction } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      resultsTriviaApi: [],
      indexQuestion: 0,
      newArray: [],
      clickAnswer: false,
      timer: 30,
      isDisable: false,
    };
  }

  componentDidMount() {
    this.getTriviaApi();
    this.setQuestionTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    this.updateTimer(prevState);
  }

  updateTimer = (prevState) => {
    if (prevState.timer === 0) {
      clearInterval(this.timerInterval);
      this.setState({
        isDisable: true,
        timer: 0,
        clickAnswer: true,
      });
    }
  }

  setQuestionTimer = () => {
    const oneSecond = 1000;
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, oneSecond);
  }

  getTriviaApi = async () => {
    const numberRandom = 0.5;
    const { indexQuestion } = this.state;
    const { history: { push } } = this.props;
    const returnTriviaApi = await apiTrivia();
    if (returnTriviaApi) {
      this.setState({
        resultsTriviaApi: returnTriviaApi,
        newArray: [returnTriviaApi[indexQuestion].correct_answer,
          ...returnTriviaApi[indexQuestion].incorrect_answers]
          .sort(() => Math.random() - numberRandom),
      });
    } else {
      push('/');
    }
  }

  getDataTestIdAnswers = (answer) => {
    const { resultsTriviaApi, indexQuestion } = this.state;
    if (answer === resultsTriviaApi[indexQuestion].correct_answer) {
      return 'correct-answer';
    }
    const wrongAnswer = resultsTriviaApi[indexQuestion].incorrect_answers
      .findIndex((el) => el === answer);
    return `wrong-answer-${wrongAnswer}`;
  }

  answerChosen = () => {
    this.setState({
      clickAnswer: true,
    });
    clearInterval(this.timerInterval);
  }

  altClassNames = (element) => {
    const { resultsTriviaApi, indexQuestion } = this.state;
    if (element === resultsTriviaApi[indexQuestion].correct_answer) {
      return 'correct-answer';
    }
    return 'incorrect-answer';
  }

  verifyCorrectAnswer = (element) => {
    const { newScore, feedbackAssertions } = this.props;
    const { resultsTriviaApi, indexQuestion, timer } = this.state;
    const hardScore = 3;
    let difficultyScore = resultsTriviaApi[indexQuestion].difficulty;
    if (difficultyScore === 'hard') {
      difficultyScore = hardScore;
    } else if (difficultyScore === 'medium') {
      difficultyScore = 2;
    } else if (difficultyScore === 'easy') {
      difficultyScore = 1;
    }

    if (resultsTriviaApi[indexQuestion].correct_answer === element) {
      newScore(timer, difficultyScore);
      feedbackAssertions();
    }
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { indexQuestion, resultsTriviaApi } = this.state;
    if (indexQuestion < resultsTriviaApi.length - 1) {
      this.setState((prev) => ({
        timer: 30,
        indexQuestion: prev.indexQuestion + 1,
        clickAnswer: false,

      }), () => this.newQuestionArray());
      this.setQuestionTimer();
    } else {
      history.push('/feedback');
    }
  }

 newQuestionArray = () => {
   const numberRandom = 0.5;
   const { indexQuestion, resultsTriviaApi } = this.state;
   this.setState({
     newArray: [resultsTriviaApi[indexQuestion].correct_answer,
       ...resultsTriviaApi[indexQuestion].incorrect_answers]
       .sort(() => Math.random() - numberRandom),
   });
 }

 render() {
   const {
     resultsTriviaApi,
     indexQuestion,
     newArray,
     clickAnswer,
     timer,
     isDisable } = this.state;

   return (
     <div>
       <Header />
       <main>
         <h3>
           {timer}
         </h3>
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
            <div data-testid="answer-options">
              { newArray.map((element, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={ this.getDataTestIdAnswers(element) }
                  onClick={ () => {
                    this.answerChosen();
                    this.verifyCorrectAnswer(element);
                  } }
                  disabled={ isDisable }
                  className={
                    clickAnswer ? this.altClassNames(element) : ''
                  }
                >
                  {element}
                </button>
              )) }
            </div>
            {
              clickAnswer
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                Next

              </button>
            )
            }

          </section>
        )}
       </main>
     </div>
   );
 }
}

const mapDispatchToProps = (dispatch) => ({
  newScore: (timer, difficulty) => dispatch(saveScoreAction(timer, difficulty)),
  feedbackAssertions: () => dispatch(feedbackScoreAction()),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  newScore: PropTypes.func.isRequired,
  feedbackAssertions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
