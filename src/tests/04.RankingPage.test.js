import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe('Verificações para a página Ranking', () => {

  const initialState = {
    player: {
      name: 'Ian Copeland',
      assertions: 1,
      score: 56,
      gravatarEmail: 'https://www.gravatar.com/avatar/a662a10230b023362c158a5fe98f85c4'
    }
  };

  test('Verifica o comportamento do botão "home"', () => {
    const { store, history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const rankingBtn = screen.getByRole("button", { name: /ranking/i });
    userEvent.click(rankingBtn);

    expect(store.getState().player.score).toBe(initialState.player.score);

    const homeBtn = screen.getByRole("button", { name: /home/i });;
    userEvent.click(homeBtn);

    expect(store.getState().player.score).toBe(0);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});