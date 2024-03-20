import React, { useState } from 'react';
import compareTravels from '../../travelsComparison';
import { Autocomplete } from '@react-google-maps/api';
import useAuth from "../../hooks/useAuth"; // Importe o hook useAuth

import './styles.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import carIcon from '../../images/icons/transport_car_icon.png';
import uberIcon from '../../images/icons/uber_icon.png';
import taxiIcon from '../../images/icons/99_icon.png';
import unknownIcon from '../../images/icons/unknown_icon.png';
import advertisementImg from '../../images/advertising.jpg';
import MapComponent from './MapComponent';

function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
  const [response, setResponse] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState('0 min');
  const [error, setError] = useState('');
  const [startButtonClass, setStartButtonClass] = useState('btn btn-secondary');
  const [appChosen, setAppChosen] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('00.00');
  const { user, createTravel } = useAuth();

  const getAppIcon = () => {
    switch (appChosen) {
      case 'uber':
        return uberIcon;
      case '99':
        return taxiIcon;
      default:
        return unknownIcon;
    }
  };

  const handleStartButtonClick = () => {
    switch (appChosen) {
      case 'uber':
        window.location.href = 'https://m.uber.com/';
        break;
      case '99':
        window.location.href = 'https://99app.com/';
        break;
      default:
        break;
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours} h ${remainingMinutes} min`;
    } else {
      return `${remainingMinutes} min`;
    }
  };

  const onDirectionsChanged = (result, status) => {
    if (status === 'OK') {
      setResponse(result);

      const durationInSeconds = result.routes[0].legs[0].duration.value;
      const durationInMinutes = Math.ceil(durationInSeconds / 60);
      const formattedTime = formatTime(durationInMinutes);
      setEstimatedTime(formattedTime);
      setError('');
      setStartButtonClass('btn btn-secondary-ready');

      const { app, price } = compareTravels(result.routes[0].legs[0].distance.value / 1000);
      setAppChosen(app);
      setEstimatedPrice(price);

      createTravel({
        user: user.id,
        origin: result.request.origin.query,
        destination: result.request.destination.query,
        estimatedPrice: price,
        travelTime: formattedTime,
        appUsed: app,
        distance: result.routes[0].legs[0].distance.value / 1000
      });
    } else {
      setError(`Não foi possível traçar a rota desejada`);
    }
  };

  const onButtonClick = () => {
    if (!origin || !destination) {
      setError('Por favor, insira origem e destino.');
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
      <div className="menu">
        <h2 className="menuTitle">Seu Destino</h2>
        <Autocomplete
          onLoad={(autocomplete) => {
            setOriginAutocomplete(autocomplete);
          }}
          onPlaceChanged={() => {
            setOrigin(originAutocomplete.getPlace().formatted_address);
          }}
        >
          <input
            className="inputLocation"
            type="text"
            placeholder="Origem"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </Autocomplete>
        <Autocomplete
          onLoad={(autocomplete) => {
            setDestinationAutocomplete(autocomplete);
          }}
          onPlaceChanged={() => {
            setDestination(destinationAutocomplete.getPlace().formatted_address);
          }}
        >
          <input
            className="inputLocation"
            type="text"
            placeholder="Destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Autocomplete>
        {error && <label className="labelError">{error}</label>}
        <button
          className={`btn ${
            origin && destination ? 'btn-secondary-ready' : 'btn-secondary'
          }`}
          onClick={onButtonClick}
        >
          Criar Rota
        </button>

        <h2 className="menuTitle">Melhores Opções</h2>
        <button className="btn btn-primary">
          <img src={carIcon} alt="car" className="icon" />
        </button>

        <h2 className="menuTitle">Tempo Estimado / Preço</h2>
        <input className="inputLocation" type="text" value={`⏳ ${estimatedTime} / 💰 R$ ${estimatedPrice}`} readOnly />

        <h2 className="menuTitle">Aplicativo Selecionado</h2>
        <img src={getAppIcon()} alt="app" className="appIcon" />
        <button className={startButtonClass} onClick={handleStartButtonClick}>
          Iniciar
        </button>
      </div>
      <MapComponent
        mapContainerStyle={{
          width: '100%',
          height: '600px'
        }}
        center={{
          lat: -22.90625932733715, 
          lng: -43.17689383053063
        }}
        zoom={14}
        response={response}
      />
      <a href='https://www.subway.com/pt-BR' className='advertisement'>
        <img src={advertisementImg} alt='ad' className="advertisement-img" />
      </a>
      <Footer />
    </>
  );
}

export default Home;
