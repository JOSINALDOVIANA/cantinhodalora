
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Useredit from "./components/adm/useredit";
// import Perfil from "./components/adm";
// import Login from "./components/adm/login";
// import Cards from "./components/InicialTela/Cards";
// import InicialTela from "./components/InicialTela/index";
import Load from "./load";

const Perfil = React.lazy(() => import("./components/adm"))
const Login = React.lazy(() => import("./components/adm/login"))
const Cards = React.lazy(() => import("./components/InicialTela/Cards"))
const InicialTela = React.lazy(() => import("./components/InicialTela/index"))
const Imagens = React.lazy(() => import("./components/adm/imagens"))
const Useredit = React.lazy(() => import("./components/adm/useredit"))
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
                        <Route path="/perfil/imagens" element={<Imagens/>}></Route>
                        <Route path="/perfil/userEdit" element={<Useredit/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.Suspense>



    );
}