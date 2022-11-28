import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import React, { createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InicialTela from "./components/InicialTela/index";
import { DadosProvider } from "./components/provider/dados";



export const Context = createContext();
export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });




function ContextProvider({ children }) {
    const [values, setValues] = React.useState({});
    return (
        <Context.Provider value={{ values, setValues }}>
            {children}
        </Context.Provider>
    );
}

export function UseDados() {
    const { values, setValues } = useContext(Context);
    return [values, setValues];
}



export default function Rotas() {

    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,          
        },
        
      }),
    [mode],
  );

    return (
      <DadosProvider>
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
            <ContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<InicialTela />} />                       
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
        </DadosProvider>


    );
}