import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './index';

describe('Home Component', () => {
  // Teste - Renderização dos componentes principais corretamente
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(getByText('Seu Destino')).toBeInTheDocument();
    expect(getByPlaceholderText('Origem')).toBeInTheDocument();
    expect(getByPlaceholderText('Destino')).toBeInTheDocument();
    expect(getByText('Criar Rota')).toBeInTheDocument();
  });

  // Teste - Verificação do erro ao não inserir origem e destino
  it('should display error when origin and destination are not entered', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const createRouteButton = getByText('Criar Rota');
    fireEvent.click(createRouteButton);

    expect(getByText('Por favor, insira origem e destino.')).toBeInTheDocument();
  });
});
