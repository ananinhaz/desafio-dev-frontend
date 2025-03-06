import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline, ThemeProvider, Container } from '@mui/material';
import { theme } from './styles/theme';
import Home from './pages/Home';

const queryClient = new QueryClient();

const App = () => {
  // carrega os favoritos do localstorage
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    const savedFavoritos = localStorage.getItem('favoritos');
    return savedFavoritos ? JSON.parse(savedFavoritos) : [];
  });

  // salva os favoritos sempre que tiver alteracao
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Home favoritos={favoritos} setFavoritos={setFavoritos} />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
