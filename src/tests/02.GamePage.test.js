import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const { questionsResponse, invalidTokenQuestionsResponse } = require('../../cypress/mocks/questions');

describe('Verificações para a página Game', () => {

  const initialState = {
    player: {
      name: 'lais',
      assertions: 0,
      score: 0,
      gravatarEmail: 'https://www.gravatar.com/avatar/e8c7e13f9383093661b25d7fcca181d2'
    }
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Verifica se a página Game possui o estado inicial correspondente', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { store, history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    const { location: { pathname } } = history
    expect(pathname).toBe('/game');
    expect(store.getState().player).toEqual(initialState.player);
  });

  test('Verifica elementos do header', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const imageGravatar = screen.getByTestId('header-profile-picture');
    expect(imageGravatar).toBeInTheDocument();
    
    expect(imageGravatar).toHaveAttribute('src', initialState.player.gravatarEmail);

    const score = screen.getByTestId('header-score');
    expect(score).toHaveTextContent('0');
  });

  test('Verificando elementos da main', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    
    const category = screen.getByTestId('question-category');
    expect(category).toHaveTextContent(`Category: ${questionsResponse.results[0].category}`);

    const question = screen.getByTestId('question-text');
    expect(question).toHaveTextContent(questionsResponse.results[0].question);
  });

  test('Varifica se o botão next é renderizado após a pergunta ser respondida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    
    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);
    
    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();
  });

  test('Verifica se ao clicar no button next, é exibida a próxima pergunta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();
    
    userEvent.click(btnNext);
    
    const question = screen.getByTestId('question-text');
    expect(question).toHaveTextContent(questionsResponse.results[1].question);
  });

  test('Verifica se é redirecionado para a página inicial caso o token não seja válido', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const { location: { pathname } } = history
    expect(pathname).toBe('/')
  });

  test('Verifica se ao responder todas as perguntas, o usuario é redirecionado para a página feedback', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    let questionButton = screen.getByTestId('correct-answer');
    userEvent.click(questionButton);
    let btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext);

    for (let n = 1; n <= 4; n += 1) {
      questionButton = screen.getByTestId('correct-answer');
      userEvent.click(questionButton);
      btnNext = screen.getByTestId('btn-next');
      userEvent.click(btnNext);
    }

    const { location: { pathname } } = history
    expect(pathname).toBe('/feedback');
  });

  test('Verifica funcionamento do timer', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    jest.useFakeTimers();
    
    renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    jest.advanceTimersByTime(3000);
    
    const timer = screen.getByRole('heading', { level: 3 });
    expect(timer).toHaveTextContent(27);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Verifica pontuação para a resposta correta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    
    const { store } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const questionButton = screen.getByTestId('correct-answer');
    userEvent.click(questionButton);
    
    const timer = screen.getByRole('heading', { level: 3 });
    expect(timer).toHaveTextContent(30);

    const score = screen.getByTestId('header-score');
    expect(score).toHaveTextContent(40);

    expect(store.getState().player.score).toBe(40);
  });

  test('Verifica pontuação uma para resposta incorreta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    
    const { store } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const incorrectQuestionBtn = screen.getByTestId('wrong-answer-0');
    userEvent.click(incorrectQuestionBtn);
    
    const timer = screen.getByRole('heading', { level: 3 });
    expect(timer).toHaveTextContent(30);

    const score = screen.getByTestId('header-score');
    expect(score).toHaveTextContent(0);

    expect(store.getState().player.score).toBe(0);
  });


  test('Verifica atualização do timer', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    jest.useFakeTimers();
    
    renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    jest.advanceTimersByTime(31000);
    
    const timer = screen.getByRole('heading', { level: 3 });
    expect(timer).toHaveTextContent(0);

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();

    const questionButton = screen.getByTestId('correct-answer');
    expect(questionButton).toBeDisabled();

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});