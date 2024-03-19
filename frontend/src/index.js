import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { LoadScript } from '@react-google-maps/api';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const apiKey = process.env.REACT_APP_API_KEY;

root.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey={apiKey}  libraries={['places']}>
      <App />
    </LoadScript>
  </React.StrictMode>
);
