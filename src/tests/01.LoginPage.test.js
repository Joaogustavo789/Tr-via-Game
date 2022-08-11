import React from "react";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from '../App'

const { questionsResponse } = require('../../cypress/mocks/questions');

describe('Testes de cobertura para tela de Login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Verifica se a tela inicial é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    // Confirmar se 'SUA VEZ' permanece
    expect(screen.getByText(/SUA VEZ/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite seu nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /configurações/i })).toBeInTheDocument();
  });

  test('Verifica se o botão é habilitado ao preencher os inputs e ao ser clicado', () => {
    renderWithRouterAndRedux(<App />);

    const btnPlay = screen.getByRole('button', { name: /play/i })
    expect(btnPlay).toBeDisabled();

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputName, 'exemplo');
    userEvent.type(inputEmail, 'exe@mplo.com');
    expect(btnPlay).not.toBeDisabled();
  });

  test('Verifica se ao clicar no botão configurações, a tela de configurações é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnSettings = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(btnSettings);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings')
    expect(screen.getByText(/configurações/i)).toBeInTheDocument();
  });

  test('Verifica se redireciona para a página game após clicar no botão play', async () => {
    jest.spyOn(global, 'fetch')
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const {history} = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', {name: /Play/i});

    userEvent.type(inputName, 'alguem');
    userEvent.type(inputEmail, 'alguem@email.com');
    userEvent.click(buttonPlay);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const { location: { pathname } } = history
    expect(pathname).toBe('/game');
  });
});