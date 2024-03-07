import React from "react";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./contexts/auth";
import "./styles/reset.css";
import "./styles/index.css";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
