import React from "react";
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const History = () => {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <h2 className="menuTitle">Histórico de Viagens</h2>
      </div>
      <Footer />
    </div>
  );
};

export default History;
