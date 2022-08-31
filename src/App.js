import logo from './logo.svg';
import './App.css';

//importo componentes para cada página, solo Home en este caso
import Home from './pages/Home';

import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
