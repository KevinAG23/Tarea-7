// Home.jsx
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from './Menu';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchData } from '../api/api';

const Home = () => {
  const [seriesData, setSeriesData] = useState(null);

  useEffect(() => {
    const obtenerDatosSeries = async () => {
      try {
        const endpoint = 'series';
        const result = await fetchData(endpoint);
        setSeriesData(result);
      } catch (error) {
        console.error('Error obteniendo datos de series:', error);
      }
    };

    obtenerDatosSeries();
  }, []);

  // Configuración del carrusel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Activar el movimiento automático
    autoplaySpeed: 1000, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box textAlign="center" mt={4}>
      
      <Menu />

      {seriesData ? (
        <div>
          <Typography variant="h5" gutterBottom>
            Series Destacadas
          </Typography>
          <Slider {...carouselSettings}>
            {seriesData.data.results.map((serie) => (
              <div key={serie.id}>
                <img
                  src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                  alt={serie.title}
                  style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                />
                <p>{serie.title}</p>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Box>
  );
};

export default Home;
