import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { BrowserRouter, Routes, Route } from "react-router-dom"; import Load from './components/load';
import TelaInicial from './components/telainicial';
import Produtos from './components/produtos';


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export function TrocarTheme() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (


        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

    );
}

export function Rotas() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const t = useTheme()
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
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <React.Suspense fallback={<Load />}>

                    <BrowserRouter >

                        <Routes>
                            <Route path="/" element={<TelaInicial />} >
                                <Route index element={<Produtos />}></Route>
                            </Route>
                            {/* <Route path="/" element={<InicialTela />} >
                                <Route index element={<Produtos />}></Route>
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/perfil" element={<Perfil />}>
                                <Route index element={<Produtosedit />}></Route>
                                <Route path="/perfil/inicio" element={<Produtosedit />}></Route>
                                <Route path="/perfil/userEdit" element={<Useredit />}></Route>
                                <Route path="/perfil/produtosedit" element={<Produtosedit />}></Route>
                                <Route path="/perfil/produtoscad" element={<Produtoscad />}></Route>
                                <Route path="/perfil/fecharCaixa" element={<Fcaixa />}></Route>
                                <Route path="/perfil/relatorio" element={<Relatorios />}></Route>
                                <Route path="/perfil/imagensclientes" element={<Imagenscli />}></Route>
                                <Route path="/perfil/imagensprodutos" element={<Imagenspro />}></Route>
                                <Route path="/perfil/promocoes" element={<Promo />}></Route>
                            </Route> */}
                        </Routes>

                    </BrowserRouter>
                </React.Suspense>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
