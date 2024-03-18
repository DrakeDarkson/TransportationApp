import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="pageHeader">
      <h3 className="appNameHeader"> Sem Fronteiras </h3>
      <div className="userContainer" onClick={handleToggleDropdown}>
        <div className="userImageHeader"></div>
        <div className={`dropdownMenu ${isDropdownOpen ? 'show' : ''}`} ref={dropdownRef}>
          <ul>
            <li className="item">Histórico</li>
          </ul>
          <ul>
            <li className="item logout" onClick={() => [signout(), navigate("/")]} >Sair</li>
          </ul>
        </div>
      </div>
      <h3 className="userNameHeader"> {user ? user.name : 'Usuário'} </h3> {/* Exibir o nome do usuário */}
    </header>
  );
}

export default Header;
