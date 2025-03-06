import React from 'react';
import { Button } from '@mui/material';

interface CidadesFavoritasProps {
  favoritos: string[];
  setFavoritos: React.Dispatch<React.SetStateAction<string[]>>;
}

const CidadesFavoritas: React.FC<CidadesFavoritasProps> = ({ favoritos, setFavoritos }) => {
  const removerFavorito = (cidade: string) => {
    const novosFavoritos = favoritos.filter((f) => f !== cidade);
    setFavoritos(novosFavoritos); 
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos)); 
  };

  return (
    <div>
      <h3>Cidades Favoritas</h3>
      <ul>
        {favoritos.map((cidade, index) => (
          <li key={index}>
            {cidade}
            <Button variant="contained" color="secondary" onClick={() => removerFavorito(cidade)}>
              Remover
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CidadesFavoritas;
