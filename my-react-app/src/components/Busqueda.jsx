import React, { useState } from 'react';
import { fetchData } from '../api/api';
import Menu from './Menu';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import './Busqueda.css';

const Busqueda = () => {
  const [query, setQuery] = useState('');
  const [personajes, setPersonajes] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleBuscarClick = async () => {
    try {
      const data = await fetchData(`characters?nameStartsWith=${query}`);

      if (data && data.data && data.data.results) {
        setPersonajes(data.data.results);
      } else {
        console.error('Error en la solicitud o ningún personaje encontrado');
        setPersonajes([]);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div>
        <div> <Menu /></div>

      <div className="container">
        <Typography variant="h4" className="title" gutterBottom>
          Buscar Personajes
        </Typography>

        <TextField
          label="Nombre del personaje"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleInputChange}
          className="inputField"
        />

        <Button variant="contained" color="primary" onClick={handleBuscarClick} className="button">
          Buscar
        </Button>

        {personajes.length > 0 && (
          <Grid container spacing={2} className="resultsContainer">
            {personajes.map((personaje) => (
              <Grid item key={personaje.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="resultCard">
                  {personaje.thumbnail && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
                      alt={personaje.name}
                    />
                  )}

                  <CardContent>
                    <Typography variant="h6">{personaje.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {personajes.length === 0 && (
          <Typography variant="h6" className={`noResults ${query.trim() === '' ? 'show' : ''}`}>
            No se encontraron resultados.
          </Typography>
        )}
      </div>
    </div>
  );
};


export default Busqueda;
