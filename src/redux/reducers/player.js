import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  const { SAVE_NAME,
    REQUIRE_GRAVATAR_SUCCESS, SAVE_SCORE,
    FEEDBACK_SCORE, RESET_SCORE } = types;

  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      name: action.name,
    };
  case REQUIRE_GRAVATAR_SUCCESS:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case FEEDBACK_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
