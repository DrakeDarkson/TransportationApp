import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TravelContainer from "../../components/TravelContainer";
import useAuth from "../../hooks/useAuth";

const History = () => {
  const { user, getAllTravels } = useAuth();

  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataFromDB = async () => {
    try {
      const travels = await getAllTravels();
      setHistoryData(travels);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDataFromDB();
    }
  }, [user, getAllTravels]);

  return (
    <div className="containerHistory">
      <Header />
      <div className="contentHistory">
        <h2 className="menuTitleHistory">Histórico de Viagens</h2>
        {isLoading ? (
          <p>Carregando...</p>
        ) : historyData.length === 0 ? (
          <p className="compliment">  Estamos ansiosos pela sua primeira viagem conosco! 😎</p>
        ) : (
          historyData.map((data, index) => (
            <TravelContainer key={index} {...data} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default History;
