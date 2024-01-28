// Comics.jsx
import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/api';
import Menu from './Menu';
import './Comics.css'; // Asegúrate de tener el archivo CSS adecuado

const Comics = () => {
  const [comicsData, setComicsData] = useState(null);

  useEffect(() => {
    const obtenerDatosComics = async () => {
      try {
        const endpoint = 'comics';
        const result = await fetchData(endpoint);
        setComicsData(result);
      } catch (error) {
        console.error('Error obteniendo datos de cómics:', error);
      }
    };

    obtenerDatosComics();
  }, []);

  return (
    <div className="container">
      <div>
        <Menu />
      </div>
      {comicsData ? (
        <div className="comics-container">
          {comicsData.data.results.map((comic) => (
            comic.images.length > 0 && (
              <div key={comic.id} className="comic">
                <div className="image-container">
                  <img src={`${comic.images[0].path}.${comic.images[0].extension}`} alt={`Image`} className="image" />
                </div>
                <div className="info-container">
                  <h2>{comic.title}</h2>
                  <p>{comic.description}</p>
                  <p className="format">Formato: {comic.format}</p>
                  <p>Páginas: {comic.pageCount}</p>
                  <h3>Creadores:</h3>
                  <ul className="creatorsList">
                    {comic.creators.items.map((creador, index) => (
                      <li key={index}>{creador.name} - {creador.role}</li>
                    ))}
                  </ul>
                  
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <p className="loading">Cargando...</p>
      )}
    </div>
  );
};

export default Comics;
