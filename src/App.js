import React, {useEffect} from 'react';
import './App.css';

import IcaoGenerator from "./components/IcaoGenerator"

function App() {

  useEffect(() => {
    document.title = "ICAO Generator"
 }, []);

  return (
    <IcaoGenerator />
  );
}

export default App;
