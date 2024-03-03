import React from "react";
import Footer from "../components/Footer";
import "../css/reset.css";
import "../css/index.css";

function Register() {
    return (
        <>
            <header className="pageHeader">
                <h3 className="appNameHeader"> Skylines </h3>
            </header>
            <body>
                <main>
                    <div className="menuLogin">
                        <form>
                            <h2 className="loginTitle">Cadastro</h2>
                            <label htmlFor="nome" className="menuTitle">Nome:</label>
                            <input type="text" id="nome" name="nome" className="inputLocation" required />

                            <label htmlFor="email" className="menuTitle">E-mail:</label>
                            <input type="email" id="email" name="email" className="inputLocation" required />

                            <label htmlFor="senha" className="menuTitle">Senha:</label>
                            <input type="password" id="senha" name="senha" className="inputLocation" required />

                            <button type="submit" className="btn btn-secondary">Cadastrar</button>
                        </form>
                    </div>
                </main>
                <Footer />
            </body>
        </>
    );
}

export default Register;
