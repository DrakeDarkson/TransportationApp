import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";

const username = "Usuário 1";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    console.log("Usuário desconectado");
  };

  return (
    <header className="pageHeader">
      <h3 className="appNameHeader"> Skylines </h3>
      <div className="userContainer" onClick={handleToggleDropdown}>
        <div className="userImageHeader"></div>
        {isDropdownOpen && (
          <div className="dropdownMenu">
            <ul>
              <li onClick={() => [signout(), navigate("/")]}>Sair</li>
            </ul>
          </div>
        )}
      </div>
      <h3 className="userNameHeader"> {username} </h3>
    </header>
  );
}

export default Header;
