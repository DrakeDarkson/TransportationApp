import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from './index';

describe('Signup Component', () => {
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(getByText('Sem fronteiras')).toBeInTheDocument();
    expect(getByPlaceholderText('Digite seu Nome de Usuário')).toBeInTheDocument();
    expect(getByPlaceholderText('Digite seu E-mail')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirme seu E-mail')).toBeInTheDocument();
    expect(getByPlaceholderText('Digite sua Senha')).toBeInTheDocument();
    expect(getByText('Inscrever-se')).toBeInTheDocument();
    expect(getByText('Já tem uma conta?')).toBeInTheDocument();
  });

  it('should handle input changes correctly', async () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Digite seu Nome de Usuário'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByPlaceholderText('Digite seu E-mail'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(getByPlaceholderText('Confirme seu E-mail'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(getByPlaceholderText('Digite sua Senha'), {
      target: { value: '123456' },
    });

    expect(getByPlaceholderText('Digite seu Nome de Usuário').value).toBe('testuser');
    expect(getByPlaceholderText('Digite seu E-mail').value).toBe('test@test.com');
    expect(getByPlaceholderText('Confirme seu E-mail').value).toBe('test@test.com');
    expect(getByPlaceholderText('Digite sua Senha').value).toBe('123456');
  });

  it('should handle form validation correctly', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Digite seu Nome de Usuário'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByPlaceholderText('Digite seu E-mail'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(getByPlaceholderText('Confirme seu E-mail'), {
      target: { value: 'test2@test.com.br' },
    });
    fireEvent.change(getByPlaceholderText('Digite sua Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText('Inscrever-se'));

    await waitFor(() => {
      expect(getByText('Os e-mails não são iguais')).toBeInTheDocument();
    });
  });
});
