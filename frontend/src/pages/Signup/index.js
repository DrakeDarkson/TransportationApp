import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import backgroundImage from "../../images/icons/Transportation_icon.png";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!username || !email || !emailConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }
  
    try {
      const errorMessage = await signup(username, email, senha);
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setSuccessMessage("Usuário cadastrado com sucesso!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <header className="pageHeader">
        <h1 className="title">Sem fronteiras</h1>
      </header>
      <img src={backgroundImage} alt="logo" className="logo" />
      <div className="content">
        <label className="label">Cadastro</label>
        <Input
          type="text"
          placeholder="Digite seu Nome de Usuário"
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <label className="labelError">{error}</label>
        <div className={`successMessage ${successMessage ? 'show-message' : ''}`}>
          {successMessage}
        </div>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <div className="labelSignin">
          Já tem uma conta?
          <strong>
            <Link to="/" className="linkStyle">&nbsp;Entre</Link>
          </strong>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
