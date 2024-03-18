import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signin from './index';

describe('Signin Component', () => {
  // Teste - Renderização dos componentes corretamente
  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    expect(getByText('Sem fronteiras')).toBeInTheDocument();
    expect(getByPlaceholderText('Digite seu E-mail')).toBeInTheDocument();
    expect(getByPlaceholderText('Digite sua Senha')).toBeInTheDocument();
    expect(getByText('LOGIN')).toBeInTheDocument();
    expect(getByText('Entrar')).toBeInTheDocument();
    expect(getByText('Não tem uma conta?')).toBeInTheDocument();
  });

  // Teste - Digitação dos campos input corretamente
  it('should handle input changes correctly', async () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Digite seu E-mail'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(getByPlaceholderText('Digite sua Senha'), {
      target: { value: '123456' },
    });

    expect(getByPlaceholderText('Digite seu E-mail').value).toBe('test@test.com');
    expect(getByPlaceholderText('Digite sua Senha').value).toBe('123456');
  });

  // Teste - Validação do formulário corretamente
  it('should handle form validation correctly', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Digite seu E-mail'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(getByPlaceholderText('Digite sua Senha'), {
      target: { value: '' },
    });

    fireEvent.click(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Preencha todos os campos')).toBeInTheDocument();
    });
  });
});
