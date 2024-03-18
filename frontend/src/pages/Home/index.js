import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import backgroundImage from "../../images/icons/transport_car_icon.png";

function Home() {

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [error, setError] = useState("");

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = {
    lat: 47.6115,
    lng: -122.3222
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}min`;
    } else {
      return `${remainingMinutes}min`;
    }
  };

  const onDirectionsChanged = (result, status) => {
    if (status === 'OK') {
      setResponse(result);

      const durationInSeconds = result.routes[0].legs[0].duration.value;
      const durationInMinutes = Math.ceil(durationInSeconds / 60);
      setEstimatedTime(formatTime(durationInMinutes));
      setError("");
    } else {
      setError(`Não foi possível traçar a rota desejada`);
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
          {error && (
            <label className="labelError">{error}</label>
          )}
          <button className={`btn ${origin && destination ? 'btn-secondary-ready' : 'btn-secondary'}`} onClick={onButtonClick}>
            Criar Rota
          </button>

          <h2 className="menuTitle">Melhores Opções</h2>
          <button className="btn btn-primary">
            <img src={backgroundImage} alt="car" className="icon"/>
          </button>

          <h2 className="menuTitle">Tempo Estimado / Preço</h2>
          <input
            className="inputLocation"
            type="text"
            value={estimatedTime}
            readOnly
          />

          <h2 className="menuTitle">Aplicativo Selecionado</h2>
          <button className="btn btn-secondary">
            Iniciar ---
          </button>
        </div>
        <div className="map">
          <LoadScript googleMapsApiKey="AIzaSyBGVaxGSqyPaYOsYTBjZ72wB6xqo3PVwEo">
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
