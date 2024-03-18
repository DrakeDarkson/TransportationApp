import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../contexts/auth';
import Header from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header Component', () => {
  // Teste - Renderização do header corretamente
  it('should render correctly', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(getByText('Sem Fronteiras')).toBeInTheDocument();
    expect(getByText('Usuário')).toBeInTheDocument();
    expect(getByAltText('logo')).toBeInTheDocument();
  });

  // Teste - Abrir e fechar dropdown do usuário
  it('should handle toggle dropdown correctly', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    const userContainer = getByText('Usuário');
    fireEvent.click(userContainer);
    expect(queryByText('Histórico')).toBeInTheDocument();
  });

  // Teste - Logout do usuário
  it('should handle user logout correctly', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { getByText } = render(
      <MemoryRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<div>Login Page</div>} />
          </Routes>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );

    const logoutButton = getByText('Sair');
    fireEvent.click(logoutButton);
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
