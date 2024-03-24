import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import userImage from "../../images/icons/user_icon.png";
import preferencesImage from "../../images/icons/preferences_icon.png";
import uberIcon from '../../images/icons/uber_icon.png';
import taxiIcon from '../../images/icons/99_icon.png';

import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap";

const User = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isUberSelected, setIsUberSelected] = useState(true);
  const [isTaxiSelected, setIsTaxiSelected] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const savePreferences = async () => {
    if (isUberSelected || isTaxiSelected) {
      setSuccessMessage("Alterações salvas!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      setError("");
    } else {
      setError("Selecione pelo menos um aplicativo.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="containerUser">
      <Header />
      <div className="contentUser">
        <div>
          <img src={userImage} alt="userImage" className="userImage" />
          <h2 className="menuTitleUser">Info</h2>
            <p>Nome de usuário: {user.name}</p>
            <p>Email: {user.email}</p>
          <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
            Editar
          </button>
        </div>
        <br /><br />
        <div>
          <img src={preferencesImage} alt="preferencesImage" className="userImage" />
          <h2 className="menuTitleUser">Preferências</h2>
          <p>Apps atualmente em uso</p>
          <label className="appIconContainer" onClick={() => setIsUberSelected(!isUberSelected)}>
            <img src={uberIcon} alt="Uber" className={isUberSelected ? "appIconU selected" : "appIconU"}  />
          </label>
          <label className="appIconContainer" onClick={() => setIsTaxiSelected(!isTaxiSelected)}>
            <img src={taxiIcon} alt="99" className={isTaxiSelected ? "appIconU selected" : "appIconU"}  />
          </label>
          <label className="labelError">{error}</label>
          <button className="btn btn-secondary" onClick={savePreferences}>
            Salvar
          </button>
          <div className={`successMessage ${successMessage ? 'show-message' : ''}`}>
            {successMessage}
          </div>
        </div>
      </div>
      <Footer />

      {showModal && (
        <div className="modalU">
          <div className="modal-contentU d-flex justify-content-between">
            <h2 className="modalTitleU">Edição de Usuário</h2>
            <label>Nome de usuário:</label>
            <input type="text" placeholder={user.name}/>
            <label>Email:</label>
            <input type="email" placeholder={user.email}/>
            <div>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button variant="dark" onClick={() => { setShowModal(false)}}>Confirmar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
