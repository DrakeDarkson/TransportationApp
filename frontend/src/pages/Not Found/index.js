import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Search_icon from "../../images/icons/Search_icon.png";

const NotFound = () => {
  const navigate = useNavigate();

  const ReturnLogin = () => {
  navigate("/");
  }

  return (
    <div className="container">
      <header className="pageHeader">
        <h1 className="title">Sem fronteiras</h1>
      </header>
      <div className="content">
        <img src={Search_icon} alt="logo" className="logo" />
        <h3>A página procurada não existe.</h3>
        <Button Text="Voltar ao Login" onClick={ReturnLogin} />
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
