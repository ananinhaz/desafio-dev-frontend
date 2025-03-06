import React, { useState } from "react";
import { buscarClima } from "../services/climaApi";
import CidadesFavoritas from "./CidadesFavoritas";
import { Button, TextField, Typography, Box } from "@mui/material";

interface CardTempoProps {
  favoritos: string[];
  setFavoritos: React.Dispatch<React.SetStateAction<string[]>>;
}

const CardTempo: React.FC<CardTempoProps> = ({ favoritos, setFavoritos }) => {
  const [cidade, setCidade] = useState("");
  const [dadosClima, setDadosClima] = useState<any>(null);
  const [previsao, setPrevisao] = useState<any>([]);

  const buscarClimaCidade = async () => {
    try {
      const clima = await buscarClima(cidade);
      setDadosClima(clima);
      
      // previsão para os proximos 3 dias 
      const previsaoFiltrada = clima.list.filter((item: any, index: number) => {
        return index % 8 === 0; 
      }).slice(0, 3);  

      setPrevisao(previsaoFiltrada);  
    } catch (error) {
      alert("Cidade não encontrada! Verifique o nome digitado.");
    }
  };

  const adicionarAosFavoritos = () => {
    if (dadosClima && dadosClima.city && !favoritos.includes(dadosClima.city.name)) {
      const novosFavoritos = [...favoritos, dadosClima.city.name];
      setFavoritos(novosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Digite o nome da cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={buscarClimaCidade}>
        Buscar Clima
      </Button>

      {dadosClima && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h5">Clima em {dadosClima.city.name}</Typography>
          <Typography variant="body1">
            Temperatura: {dadosClima.list[0].main.temp}°C
          </Typography>
          <Typography variant="body1">
            Máxima: {dadosClima.list[0].main.temp_max}°C
          </Typography>
          <Typography variant="body1">
            Mínima: {dadosClima.list[0].main.temp_min}°C
          </Typography>
          <Typography variant="body1">
            Precipitação: {dadosClima.list[0].weather[0].description}
          </Typography>
          <Typography variant="body1">Vento: {dadosClima.list[0].wind.speed} m/s</Typography>

          <Button variant="outlined" onClick={adicionarAosFavoritos}>
            Adicionar aos Favoritos
          </Button>
        </Box>
      )}

      {previsao.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Previsão para os próximos 3 dias:</Typography>
          {previsao.map((dia: any, index: number) => (
            <Box key={index} sx={{ marginTop: 1 }}>
              <Typography variant="body1">
                {new Date(dia.dt * 1000).toLocaleDateString("pt-BR")}
              </Typography>
              <Typography variant="body1">
                Temperatura: {dia.main.temp}°C
              </Typography>
              <Typography variant="body1">
                Vento: {dia.wind.speed} m/s
              </Typography>
              <Typography variant="body1">Precipitação: {dia.weather[0].description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <CidadesFavoritas favoritos={favoritos} setFavoritos={setFavoritos} />
    </Box>
  );
};

export default CardTempo;
