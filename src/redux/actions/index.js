import * as types from './actionTypes';

export const saveNameAction = (name) => ({
  type: types.SAVE_NAME,
  name,
});

export const requireGravatarAction = (gravatarEmail) => ({
  type: types.REQUIRE_GRAVATAR_SUCCESS,
  gravatarEmail: `https://www.gravatar.com/avatar/${gravatarEmail}`,
});

export const saveScoreAction = (timer, difficulty) => {
  const questionPoinsts = 10;
  return ({
    type: types.SAVE_SCORE,
    score: questionPoinsts + (timer * difficulty),
  });
};

export const feedbackScoreAction = (assertions) => ({
  type: types.FEEDBACK_SCORE,
  assertions,
});

export const resetScoreAction = () => ({
  type: types.RESET_SCORE,
});
