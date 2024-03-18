import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NotFound Component', () => {
  // Teste - Renderização dos componentes corretamente
  it('should render correctly', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(getByText('Sem fronteiras')).toBeInTheDocument();
    expect(getByText('A página procurada não existe.')).toBeInTheDocument();
    expect(getByAltText('logo')).toBeInTheDocument();
    expect(getByText('Voltar ao Login')).toBeInTheDocument();
  });

  // Teste - Redirecionamento para o login corretamente
  it('should handle redirect on button click correctly', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByText } = render(
      <MemoryRouter initialEntries={['/not-found']}>
        <Routes>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(getByText('Voltar ao Login'));
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
