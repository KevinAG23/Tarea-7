import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Menu = () => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Link to="/" style={{ textDecoration: 'none', margin: '10px' }}>
        <Button variant="contained" color="primary">
          Inicio
        </Button>
      </Link>
      <Link to="/personajes" style={{ textDecoration: 'none', margin: '10px' }}>
        <Button variant="contained" color="primary">
          Personajes
        </Button>
      </Link>
      <Link to="/busqueda" style={{ textDecoration: 'none', margin: '10px' }}>
        <Button variant="contained" color="primary">
          Búsqueda de Personajes
        </Button>
      </Link>
      <Link to="/comics" style={{ textDecoration: 'none', margin: '10px' }}>
        <Button variant="contained" color="primary">
          Comics
        </Button>
      </Link>
    </Box>
  );
};

export default Menu;
