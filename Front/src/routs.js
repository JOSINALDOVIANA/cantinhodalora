
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Produtos from "./components/adm/produtos";
// import Useredit from "./components/adm/useredit";
// import Perfil from "./components/adm";
// import Login from "./components/adm/login";
// import Cards from "./components/InicialTela/Cards";
// import InicialTela from "./components/InicialTela/index";
import Load from "./load";

const Perfil = React.lazy(() => import("./components/adm"))
const Login = React.lazy(() => import("./components/adm/user/login"))
const Cards = React.lazy(() => import("./components/InicialTela/Cards"))
const InicialTela = React.lazy(() => import("./components/InicialTela/index"))
const Imagens = React.lazy(() => import("./components/adm/user/imagens"))
const Useredit = React.lazy(() => import("./components/adm/user/useredit"))
const Produtosedit = React.lazy(() => import("./components/adm/produtos/editar"))
const Produtoscad = React.lazy(() => import("./components/adm/produtos/cadastro"))
// const Load= React.lazy(() => import("./load"))












export default function Rotas() {



    return (



        <React.Suspense fallback={<Load />}>

            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<InicialTela />} >
                        <Route index element={<Cards />}></Route>
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/perfil" element={<Perfil />}>
                        <Route index element={<Cards/>}></Route>
                        <Route path="/perfil/inicio"  element={<Cards/>}></Route>
                        <Route path="/perfil/userEdit" element={<Useredit/>}></Route>
                        <Route path="/perfil/produtosedit" element={<Produtosedit/>}></Route>
                        <Route path="/perfil/produtoscad" element={<Produtoscad/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.Suspense>



    );
}