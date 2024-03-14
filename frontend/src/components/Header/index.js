import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";

const username = "Usuário 1";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { signout } = useAuth();
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
      <h3 className="appNameHeader"> Skylines </h3>
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
      <h3 className="userNameHeader"> {username} </h3>
    </header>
  );
}

export default Header;
