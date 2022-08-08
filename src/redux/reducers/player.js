import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  const { SAVE_NAME, REQUIRE_GRAVATAR_SUCCESS } = types;
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
  default:
    return state;
  }
};

export default player;
