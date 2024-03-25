import React, { useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import userImage from "../../images/icons/user_icon.png";
import preferencesImage from "../../images/icons/preferences_icon.png";
import editIcon from "../../images/icons/edit_icon.png";
import uberIcon from "../../images/icons/uber_icon.png";
import taxiIcon from "../../images/icons/99_icon.png";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const User = () => {
  const { user, editUser, deleteUser, deleteTravelHistory, editPreferences } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUberSelected, setIsUberSelected] = useState(user.apps.includes('Uber'));
  const [isTaxiSelected, setIsTaxiSelected] = useState(user.apps.includes('99'));
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const savePreferences = async () => {
    if (isUberSelected || isTaxiSelected) {
      try {
        const selectedApps = [];
        if (isUberSelected) {
          selectedApps.push("Uber");
        }
        if (isTaxiSelected) {
          selectedApps.push("99");
        }
        await editPreferences(selectedApps);
        setSuccessMessage("Alterações salvas!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
        setError("");
      } catch (error) {
        setError("Erro ao salvar preferências");
      }
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
          <img
            src={editIcon}
            alt="edit"
            className="editIcon"
            onClick={() => setShowModal(true)}
          />
          <br />
          <Button variant="danger" className="btn btn-secondary" onClick={() => setShowDeleteModal(true)}>
            Excluir Conta
          </Button>
        </div>
        <hr />
        <div>
          <img
            src={preferencesImage}
            alt="preferencesImage"
            className="userImage"
          />
          <h2 className="menuTitleUser">Preferências</h2>
          <p>Apps atualmente em uso</p>
          <label
            className="appIconContainer"
            onClick={() => setIsUberSelected(!isUberSelected)}
          >
            <img
              src={uberIcon}
              alt="Uber"
              className={
                isUberSelected ? "appIconU selected" : "appIconU"
              }
            />
          </label>
          <label
            className="appIconContainer"
            onClick={() => setIsTaxiSelected(!isTaxiSelected)}
          >
            <img
              src={taxiIcon}
              alt="99"
              className={
                isTaxiSelected ? "appIconU selected" : "appIconU"
              }
            />
          </label>
          <label className="labelError">{error}</label>
          <Button
            variant="dark"
            className="btn btn-secondary"
            onClick={savePreferences}
          >
            Salvar
          </Button>
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
            <label>Novo Nome de usuário:</label>
            <input
              type="text"
              placeholder={user.name}
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <p>* Você poderá alterar futuramente se desejar.</p>
            <label className="labelError">{modalError}</label>
            <div>
              <Button variant="secondary" onClick={() => { 
                setModalError("");
                setNewUserName("");
                setShowModal(false)
              }}>
                Cancelar
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  if (newUserName.trim() !== "") {
                    editUser(newUserName);
                    setModalError("");
                    setNewUserName("");
                    setShowModal(false)
                    setSuccessMessage("Alterações salvas!");
                    setTimeout(() => {
                      setSuccessMessage("");
                    }, 1000);
                  } else {
                    setModalError("Nome de usuário inválido");
                  }
                }}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modalH">
          <div className="modal-contentH d-flex justify-content-between">
            <h2 className="modalTitleH">Deseja realmente excluir a sua conta?</h2>
            <div>
              <Button variant="dark" onClick={() => setShowDeleteModal(false)}>Não</Button>
              <Button variant="danger" onClick={() => { 
                deleteTravelHistory()
                deleteUser()
                navigate("/")
              }}>
              Sim
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
