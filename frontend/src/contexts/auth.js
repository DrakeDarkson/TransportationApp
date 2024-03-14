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

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
