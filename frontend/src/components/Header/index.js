import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";
import logoImage from "../../images/icons/Transportation_icon.png";
import userImage from "../../images/icons/user_icon.png";

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
      <img src={logoImage} alt="logo" className="logoImageHeader" onClick={() => [navigate("/home")]} />
      <h3 className="appNameHeader"> Sem Fronteiras </h3>
      <div className="userContainer" onClick={handleToggleDropdown}>
        <img src={userImage} alt="userImage" className="userImageHeader" />
        <div className={`dropdownMenu ${isDropdownOpen ? 'show' : ''}`} ref={dropdownRef}>
          <ul>
            <li className="item" onClick={() => [navigate("/user")]}>Usuário</li>
          </ul>
          <ul>
            <li className="item" onClick={() => [navigate("/history")]}>Histórico</li>
          </ul>
          <ul>
            <li className="item logout" onClick={() => [signout(), navigate("/")]} >Sair</li>
          </ul>
        </div>
      </div>
      <h3 className="userNameHeader"> {user ? user.name : 'Usuário'} </h3>
    </header>
  );
}

export default Header;
