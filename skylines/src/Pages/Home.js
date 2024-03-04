import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import "../css/reset.css";
import "../css/index.css";

function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  // API Key: AIzaSyB6PkQch27zMLfODrDcZFw2gYsDw_Fs6ng

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = {
    lat: 47.6115,
    lng: -122.3222
  };

  const onDirectionsChanged = (result, status) => {
    if (status === 'OK') {
      setResponse(result);
    } else {
      console.error(`Error fetching directions: ${status}`);
    }
  };

  const onButtonClick = () => {
    if (!origin || !destination) {
      console.error("Por favor, insira origem e destino.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: 'DRIVING'
      },
      onDirectionsChanged
    );
  };

  return (
    <>
      <Header />
      <body>
        <div className="menu">
          <h2 className="menuTitle">Seu Destino</h2>
          <input
            className="inputLocation"
            type="text"
            placeholder="Origem"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <br />
          <input
            className="inputLocation"
            type="text"
            placeholder="Destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button className="btn btn-primary" onClick={onButtonClick}>
            +
          </button>

          <h2 className="menuTitle">Melhores Opções</h2>
          <button className="btn btn-primary">
            +
          </button>

          <h2 className="menuTitle">Tempo Estimado / Preço</h2>
          <input
            className="inputLocation"
            type="text"
            placeholder="50 min - R$20,00"
          />

          <h2 className="menuTitle">Aplicativo Selecionado</h2>
          <button className="btn btn-secondary">
            Iniciar ---
          </button>
        </div>
        <div className="map">
          <LoadScript googleMapsApiKey="#API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
            >
              {response && (
                <DirectionsRenderer
                  options={{
                    directions: response
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </body>
      <Footer />
    </>
  );
}

export default Home;
