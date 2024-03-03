import React from "react";
import Footer from "../components/Footer";
import "../css/reset.css";
import "../css/index.css";

function Login() {
    return (
        <>
            <header className="pageHeader">
                <h3 className="appNameHeader"> Skylines </h3>
            </header>
            <body>
                <main>
                    <div className="menuLogin">
                        <form>
                            <h2 className="loginTitle">Login</h2>
                            <label htmlFor="email" className="menuTitle">E-mail:</label>
                            <input type="email" id="email" name="email" className="inputLocation" required />

                            <label htmlFor="password" className="menuTitle">Senha:</label>
                            <input type="password" id="password" name="password" className="inputLocation" required />

                            <button type="submit" className="btn btn-secondary">Entrar</button>
                        </form>
                    </div>
                </main>
                <Footer />
            </body>
        </>
    );
}

export default Login;
