import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      setUser(JSON.parse(userToken));
    }
  }, []);

  const signin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Senha ou email incorretos");
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("user_token", JSON.stringify(userData));
    } catch (error) {
      return error.message;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: username, email, password })
      });

      if (!response.ok) {
        throw new Error("Usuário já existente");
      }

      const newUser = await response.json();
      setUser(newUser);
      localStorage.setItem("user_token", JSON.stringify(newUser));
    } catch (error) {
      return error.message;
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  const editUser = async (newName) => {
    try {
      const userToken = localStorage.getItem("user_token");
      if (!userToken) {
        throw new Error("Token de usuário não encontrado");
      }
  
      const response = await fetch(`http://localhost:3001/api/editUser/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({ name: newName })
      });
  
      if (!response.ok) {
        throw new Error("Erro ao editar usuário");
      }
  
      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user_token", JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
      throw new Error('Erro ao editar usuário.');
    }
  };

  const deleteUser = async () => {
    try {
      const userToken = localStorage.getItem("user_token");
      if (!userToken) {
        throw new Error("Token de usuário não encontrado");
      }
  
      const response = await fetch(`http://localhost:3001/api/deleteUser/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }
  
      setUser(null);
      localStorage.removeItem("user_token");
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw new Error('Erro ao excluir usuário.');
    }
  };

  const createTravel = async (data) => {
    try {
      const userToken = localStorage.getItem("user_token");
      if (!userToken) {
        throw new Error("Token de usuário não encontrado");
      }
      
      const response = await fetch("http://localhost:3001/api/createTravel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error("Erro ao criar viagem");
      }
  
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
      throw new Error('Erro ao criar viagem.');
    }
  };  

  const getAllTravels = async () => {
    try {
      const userToken = localStorage.getItem("user_token");
      if (!userToken) {
        throw new Error("Token de usuário não encontrado");
      }

      const response = await fetch(`http://localhost:3001/api/getAllTravels?userId=${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar viagens");
      }

      const travelsData = await response.json();
      return travelsData;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar viagens");
    }
  };

  const deleteTravelHistory = async () => {
    try {
      const userToken = localStorage.getItem("user_token");
      if (!userToken) {
        throw new Error("Token de usuário não encontrado");
      }
  
      const userData = JSON.parse(userToken);
      const userId = userData.id;
      
      const response = await fetch(`http://localhost:3001/api/deleteTravelHistory/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir histórico de viagens");
      }
  
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao excluir histórico de viagens");
    }
  };  

  const editPreferences = async (apps) => {
    try {
      const userToken = localStorage.getItem("user_token");
      if (!userToken) {
        throw new Error("Token de usuário não encontrado");
      }

      const response = await fetch(`http://localhost:3001/api/editPreferences/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({ apps })
      });

      if (!response.ok) {
        throw new Error("Erro ao editar preferências");
      }

    } catch (error) {
      console.error('Erro ao editar preferências:', error);
      throw new Error('Erro ao editar preferências.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signin,
        signup,
        signout,
        createTravel,
        getAllTravels,
        deleteTravelHistory,
        editUser,
        deleteUser,
        editPreferences
      }}
    >
      {children}
    </AuthContext.Provider>
  );  
};
