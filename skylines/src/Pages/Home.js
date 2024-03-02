import React from "react";
import Header from "../components/Header";
import MapImage from "../Images/Map_placeholder.png";
import "../css/reset.css"
import "../css/index.css"

function Home() {
    return (
        <>
            <Header />
            <body>
                <div className="menu">
                    <h2 className="menuTitle">Seu Destino</h2>
                    <input className="inputLocation" type="text" placeholder="Origem"></input><br/>
                    <input className="inputLocation" type="text" placeholder="Destino"></input>
                    <a href="#" className="btn btn-primary">+</a>

                    <h2 className="menuTitle">Melhores Opções</h2>
                    <a href="#" className="btn btn-primary">+</a>

                    <h2 className="menuTitle">Tempo Estimado / Preço</h2>
                    <input className="inputLocation" type="text" placeholder="50 min - R$20,00"></input>
                    
                    <h2 className="menuTitle">Aplicativo Selecionado</h2>
                    <a href="#" className="btn btn-secondary">Iniciar ---</a>
                </div>
                <div className="map">
                    <img src={MapImage} className="mapExhibition" alt="Mapa de rotas"/>
                </div>
            </body>
        </>
    )
}

export default Home