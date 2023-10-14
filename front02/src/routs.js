import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Load from './components/load';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import {  MdBrightness4 } from "react-icons/md"

import { Typography } from '@mui/material';
import { Brightness6, Brightness7 } from '@mui/icons-material';
// const InicialTela = React.lazy(() => import("./telas/home/index.js"));
const TelaInicial = React.lazy(() => import('./components/telainicial.js'));
const Produtos = React.lazy(() => import('./components/produtos/index.js'));
const Login = React.lazy(() => import('./components/adm/user/login.js'));
const Produtosedit = React.lazy(() => import('./components/adm/produtos/editar.js'));
const Useredit = React.lazy(() => import('./components/adm/user/useredit.js'));
const Produtoscad = React.lazy(() => import('./components/adm/produtos/cadastro.js'));
const Fcaixa = React.lazy(() => import('./components/adm/fechamento/index.js'));
const Relatorios = React.lazy(() => import('./components/adm/relatorios/index.js'));
const Imagenscli = React.lazy(() => import('./components/adm/imagens/imagenscli.js'));
const Imagensprod = React.lazy(() => import('./components/adm/imagens/imagenspro.js'));
const Promo = React.lazy(() => import('./components/adm/promo/index.js'));
const Perfil = React.lazy(() => import('./components/adm/index.js'));
const TelaIncialCliente = React.lazy(() => import('./components/cliente/index.js'));
const CadastroCliente = React.lazy(() => import('./components/cliente/cadastro.js'));
const ClienteDados = React.lazy(() => import('./components/cliente/dadoscliente.js'));
const ListaClientes = React.lazy(() => import('./components/adm/user/ClientesList.js'));
const Teste = React.lazy(() => import('./components/teste/index.js'));



export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export let SearchContex = React.createContext(null);
export let DadosContext = React.createContext(null);

export function TrocarTheme(props) {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (


        <IconButton {...props} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness6 /> : <Brightness7 />}
        </IconButton>

    );
}

export function Rotas() {
    const [search, setSearch] = React.useState("")
    const [Dados, setDados] = React.useState({})
    const [mode, setMode] = React.useState(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark"
        } else {
            return "light"
        }
    });
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
        <DadosContext.Provider value={[Dados, setDados]}>
            <SearchContex.Provider value={[search, setSearch]}>
                <ColorModeContext.Provider value={colorMode}>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                        <ThemeProvider theme={theme}>
                            <React.Suspense fallback={<Load />}>

                                <BrowserRouter >

                                    <Routes>
                                        <Route path="/*" element={<Typography>DESCULPE!! este recuso esta indisponivel ou em desenvolvimento</Typography>} />
                                        <Route path="/teste" element={<Teste />} />
                                        <Route path="/" element={<TelaInicial />} >
                                            <Route index element={<Produtos />}></Route>
                                        </Route>
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/cadastro/cliente" element={<CadastroCliente />} />
                                        <Route path="/perfil" element={<Perfil />}>
                                            <Route index element={<Produtosedit />}></Route>
                                            <Route path="/perfil/inicio" element={<Produtosedit />}></Route>
                                            <Route path="/perfil/userEdit" element={<Useredit />}></Route>
                                            <Route path="/perfil/produtosedit" element={<Produtosedit />}></Route>
                                            <Route path="/perfil/produtoscad" element={<Produtoscad />}></Route>
                                            <Route path="/perfil/fecharCaixa" element={<Fcaixa />}></Route>
                                            <Route path="/perfil/relatorio" element={<Relatorios />}></Route>
                                            <Route path="/perfil/imagensclientes" element={<Imagenscli />}></Route>
                                            <Route path="/perfil/imagensprodutos" element={<Imagensprod />}></Route>
                                            <Route path="/perfil/promocoes" element={<Promo />}></Route>
                                            <Route path="/perfil/clientes" element={<ListaClientes />}></Route>
                                        </Route>
                                        <Route path="/cliente" element={<TelaIncialCliente />} >
                                            <Route index element={<ClienteDados />}></Route>
                                            <Route path="/cliente/cadastro" element={<CadastroCliente />} />
                                          
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
                        {/* </LocalizationProvider> */}

                </ColorModeContext.Provider>
            </SearchContex.Provider>
        </DadosContext.Provider>
    );
}
