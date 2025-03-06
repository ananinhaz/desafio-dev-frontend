import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardTempo from "../components/Cardtempo";

test("Renderiza input e botão corretamente", () => {
  render(<CardTempo favoritos={[]} setFavoritos={() => {}} />);
  
  expect(screen.getByLabelText(/Digite o nome da cidade/i)).toBeInTheDocument();
  expect(screen.getByText(/Buscar Clima/i)).toBeInTheDocument();
});
