import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="container">
      <div className="content">
        <label className="label">LOGIN</label>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <label className="labelError">{error}</label>
        <Button Text="Entrar" onClick={handleLogin} />
        <div className="labelSignup">
          Não tem uma conta?
          <strong>
            <Link to="/signup" className="linkStyle">&nbsp;Registre-se</Link>
          </strong>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
