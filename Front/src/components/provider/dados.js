import React, { createContext } from 'react';

// import { Container } from './styles';
export const DadosContexto = createContext()
export function DadosProvider({ children }) {
  const [page, setPage] = React.useState("primeira");
  
  return (
    <DadosContexto.Provider value={
      {page,setPage}
    }>
      {children}
    </DadosContexto.Provider>
  );
}