import React from 'react';
import Cardtempo from '../components/Cardtempo';

interface HomeProps {
  favoritos: string[];
  setFavoritos: React.Dispatch<React.SetStateAction<string[]>>;
}

const Home: React.FC<HomeProps> = ({ favoritos, setFavoritos }) => {
  return (
    <div>
      <Cardtempo favoritos={favoritos} setFavoritos={setFavoritos} />
    </div>
  );
};

export default Home;
