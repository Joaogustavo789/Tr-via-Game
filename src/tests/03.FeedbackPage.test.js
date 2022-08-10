import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe('Verificações para a página Feedback', () => {

  const initialState4assertions = {
    player: {
      name: 'Dolan Allen',
      assertions: 4,
      score: 215,
      gravatarEmail: 'https://www.gravatar.com/avatar/1ba872b23a49c691b14207bb487330ae'
    }
  };

  const initialState2assertions = {
    player: {
      name: 'Nash Dunlap',
      assertions: 2,
      score: 136,
      gravatarEmail: 'https://www.gravatar.com/avatar/76dff9fdd7c14ee1ebe4b53aa8a1b72c'
    }
  };

  const initialState1assertion = {
    player: {
      name: 'Ian Copeland',
      assertions: 1,
      score: 56,
      gravatarEmail: 'https://www.gravatar.com/avatar/a662a10230b023362c158a5fe98f85c4'
    }
  };

  test('Verifica se a página possui as informações corretas para 3 ou mais acertos', () => {
    renderWithRouterAndRedux(<App />, initialState4assertions, '/feedback');

    const score = screen.getByTestId('feedback-total-score');
    expect(score).toHaveTextContent(initialState4assertions.player.score);

    const assertions = screen.getByTestId('feedback-total-question');
    expect(assertions).toHaveTextContent(initialState4assertions.player.assertions);

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Well Done!');
  });

  test('Verifica se a página possui as informações corretas para menos de 3 acertos', () => {
    renderWithRouterAndRedux(<App />, initialState2assertions, '/feedback');

    const score = screen.getByTestId('feedback-total-score');
    expect(score).toHaveTextContent(initialState2assertions.player.score);

    const assertions = screen.getByTestId('feedback-total-question');
    expect(assertions).toHaveTextContent(initialState2assertions.player.assertions);

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Could be better...');
  });

  test('Verifica o comportamento do botão "Play Again"', () => {
    const { store, history } = renderWithRouterAndRedux(<App />, initialState1assertion, '/feedback');

    expect(store.getState().player.score).toBe(initialState1assertion.player.score);

    const playAgainBtn = screen.getByRole("button", { name: /play again/i });
    userEvent.click(playAgainBtn);

    expect(store.getState().player.score).toBe(0);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Verifica o comportamento do botão "Ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    const rankingBtn = screen.getByRole("button", { name: /ranking/i });
    userEvent.click(rankingBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking');
  });
});