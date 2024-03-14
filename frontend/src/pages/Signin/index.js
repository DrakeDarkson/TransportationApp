import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import backgroundImage from "../../images/icons/Transportation_icon.png";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const res = await signin(email, senha);

      if (res) {
        setError(res);
      } else {
        alert("Usuário logado com sucesso!");
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <header className="pageHeader">
        <img src={backgroundImage} alt="logo" className="logo" />
      </header>
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
        <Button Text="Entrar" onClick={handleLogin} disabled={loading} />
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
