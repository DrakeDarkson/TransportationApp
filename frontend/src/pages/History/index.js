import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TravelContainer from "../../components/TravelContainer";

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  const fetchDataFromDB = () => {
    const dataFromDB = [
      {
        origin: "Taquara, Rio de Janeiro - RJ, Brasil",
        destination: "Barra da Tijuca, Rio de Janeiro - RJ, Brasil",
        estimatedPrice: "14,90 - 37,43",
        travelTime: "18 min",
        appUsed: "uber",
        distance: "11.801"
      },
      {
        origin: "Taquara, Rio de Janeiro - RJ, Brasil",
        destination: "Barra da Tijuca, Rio de Janeiro - RJ, Brasil",
        estimatedPrice: "14,90 - 37,43",
        travelTime: "18 min",
        appUsed: "uber",
        distance: "11.801"
      }
    ];
    setHistoryData(dataFromDB);
  };

  useEffect(() => {
    fetchDataFromDB();
  }, []);

  return (
    <div className="containerHistory">
      <Header />
      <div className="contentHistory">
        <h2 className="menuTitleHistory">Histórico de Viagens</h2>
        {historyData.map((data, index) => (
          <TravelContainer key={index} {...data} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default History;
