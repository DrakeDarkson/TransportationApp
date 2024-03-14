import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.find(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser);
    }
  }, []);

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.find(
      (user) => user.email === email && user.password === password
    );

    if (hasUser) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("user_token", JSON.stringify({ email, token }));
      setUser(hasUser);
      return;
    } else {
      return "E-mail ou senha incorretos";
    }
  };

  const signup = (username, email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.find((user) => user.email === email);

    if (hasUser) {
      return "Já existe uma conta com este e-mail";
    }

    const newUser = {
      username,
      email,
      password
    };

    const updatedUsers = usersStorage ? [...usersStorage, newUser] : [newUser];

    localStorage.setItem("users_bd", JSON.stringify(updatedUsers));
    setUser(newUser);

    return;
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
