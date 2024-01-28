// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import { useState } from 'react';
import Personajes from './components/Personajes';
import Busqueda from './components/Busqueda';
import Comics from './components/Comics';
import '@mui/material/styles';


function App() {
  

  return (
    
    <Router>
      <div className="app-container">
        <h1>MARVEL</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personajes" element={<Personajes />} />
          <Route path="/busqueda" element={<Busqueda />} />
          <Route path="/comics" element={<Comics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
