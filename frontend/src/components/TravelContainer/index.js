import "./styles.css";
import uberIcon from '../../images/icons/uber_icon.png';
import taxiIcon from '../../images/icons/99_icon.png';

const TravelContainer = ({ origin, destination, estimatedPrice, travelTime, appUsed, distance }) => {
  const formattedDistance = parseFloat(distance).toFixed(1);
  
  const getAppIcon = () => {
    switch (appUsed) {
      case 'uber':
        return uberIcon;
      case '99':
        return taxiIcon;
      default:
        return null;
    }
  };

  const extractTextUntilComma = (text) => {
    const commaIndex = text.indexOf(',');
    return commaIndex !== -1 ? text.substring(0, commaIndex) : text;
  };

  return (
    <div className="travelContainer">
      <div className="columnsWrapper">
        <h2 className="menuTitleH">
          Viagem<br/> {extractTextUntilComma(origin)} - {extractTextUntilComma(destination)}
        </h2>
        <div className="column">
          <p>Origem: {extractTextUntilComma(origin)}</p>
          <p>Destino: {extractTextUntilComma(destination)}</p>
        </div>
        <div className="column">
          <p>⏳ Tempo de Viagem: {travelTime}</p>
          <p>🛣️ Distância: {formattedDistance} km</p>
        </div>
        <div className="column">
          <p>💰 Preço Estimado:</p>
          <p> R$ {estimatedPrice}</p>
          <p>🚗 Aplicativo Utilizado:</p>
          <img src={getAppIcon()} alt="app" className="appIconH" />
        </div>
      </div>
    </div>
  );
};

export default TravelContainer;
