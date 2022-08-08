import * as types from './actionTypes';
// import { apiGravatar } from '../../service/apiTrivia';

export const saveNameAction = (name) => ({
  type: types.SAVE_NAME,
  name,
});

export const requireGravatarAction = (gravatarEmail) => ({
  type: types.REQUIRE_GRAVATAR_SUCCESS,
  gravatarEmail: `https://www.gravatar.com/avatar/${gravatarEmail}`,
});
