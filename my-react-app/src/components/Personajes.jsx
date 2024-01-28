import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/api';
import Menu from './Menu';
import './Personajes.css';

const Personajes = () => {
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const endpoint = 'characters';
        const result = await fetchData(endpoint);

        const personajesFiltrados = result.data.results.filter((personaje) =>
          personaje.thumbnail &&
          personaje.thumbnail.path &&
          personaje.thumbnail.extension &&
          personaje.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_found.jpg" &&
          personaje.stories.items.length > 0 &&
          personaje.comics.items.length > 0 &&
          personaje.series.items.length > 0
        );

        setData({ data: { results: personajesFiltrados } });
      } catch (error) {
        console.error('Error obteniendo datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container">
      <div>
        <Menu />
      </div>
    
      <div className="category">
        <label>Filtrar por categoría: </label>
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
          <option value="all">Todas</option>
          <option value="comics">Cómics</option>
          <option value="historias">Historias</option>
          <option value="series">Series</option>
        </select>
      </div>
    
      {data ? (
        <div className="personajes-container">
          {data.data.results.map((personaje, index) => (
            <div key={personaje.id} className="personaje">
              {/* Imagen */}
              {personaje.thumbnail && personaje.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_found.jpg" && (
                <img
                  src={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
                  alt={personaje.name}
                  className="thumbnail"
                />
              )}
    
              {/* Texto */}
              <div className="text-container">
                <h2>{personaje.name}</h2>
                {personaje.description && <p>{personaje.description}</p>}
    
                {/* Cómics */}
                {selectedCategory === 'all' || selectedCategory === 'comics' ? (
                  <div>
                    <h3>Cómics:</h3>
                    <ul className="comicsList">
                      {personaje.comics.items.map((comic, index) => (
                        <li key={index}>{comic.name}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
    
          
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading">Cargando...</p>
      )}
    </div>
  );
};

export default Personajes;
