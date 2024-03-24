import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import trashIcon from "../../images/icons/trash_icon.png";
import TravelContainer from "../../components/TravelContainer";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap"; // Importe o componente Button do Bootstrap

const History = () => {
  const { user, getAllTravels, deleteTravelHistory } = useAuth();

  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchDataFromDB = async () => {
    try {
      const travels = await getAllTravels();
      setHistoryData(travels);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (confirmDelete) {
      try {
        await deleteTravelHistory();
        setHistoryData([]); // Limpa os dados após a exclusão
        setShowModal(false); // Fecha o modal após a exclusão
      } catch (error) {
        console.error(error);
      }
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
        <button className="trashBtn" onClick={() => setShowModal(true)}>
          <img src={trashIcon} alt="trash" className="iconT" />
        </button>
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

      {showModal && (
        <div className="modal">
          <div className="modal-content d-flex justify-content-between">
            <h2 className="modalTitle">Deseja apagar o seu histórico?</h2>
            <div>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button variant="danger" onClick={() => { setConfirmDelete(true); handleDeleteConfirm(); }}>Confirmar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
