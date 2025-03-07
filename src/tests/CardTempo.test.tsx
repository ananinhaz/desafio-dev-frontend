import React, { useState, useEffect } from 'react';
import CardTempo from '../components/Cardtempo';

const Home: React.FC = () => {
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    const savedFavoritos = localStorage.getItem('favoritos');
    return savedFavoritos ? JSON.parse(savedFavoritos) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  return (
    <div>
      <CardTempo favoritos={favoritos} setFavoritos={setFavoritos} />
    </div>
  );
};

export default Home;
