
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Load from "./load";
import Relatorios from "./components/adm/relatorios";
const Perfil = React.lazy(() => import("./telas/adm"));
const Login = React.lazy(() => import("./telas/login/login"));
const Produtos = React.lazy(() => import("./components/produtos/index"));
const InicialTela = React.lazy(() => import("./telas/home/index.js"));
const Imagenscli = React.lazy(() => import("./components/adm/imagens/imagenscli.js"));
const Imagenspro = React.lazy(() => import("./components/adm/imagens/imagenspro.js"));
const Useredit = React.lazy(() => import("./components/adm/user/useredit"));
const Produtosedit = React.lazy(() => import("./components/adm/produtos/editar"));
const Produtoscad = React.lazy(() => import("./components/adm/produtos/cadastro"));
const Fcaixa = React.lazy(() => import("./components/adm/fechamento"));
const Promo = React.lazy(() => import("./components/adm/promo"));














export default function Rotas() {



	return (



		<React.Suspense fallback={<Load />}>

			<BrowserRouter >
				<Routes>
					<Route path="/" element={<InicialTela />} >
						<Route index element={<Produtos />}></Route>
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/perfil" element={<Perfil />}>
						<Route index element={<Produtosedit/>}></Route>
						<Route path="/perfil/inicio"  element={<Produtosedit/>}></Route>
						<Route path="/perfil/userEdit" element={<Useredit/>}></Route>
						<Route path="/perfil/produtosedit" element={<Produtosedit/>}></Route>
						<Route path="/perfil/produtoscad" element={<Produtoscad/>}></Route>
						<Route path="/perfil/fecharCaixa" element={<Fcaixa/>}></Route>
						<Route path="/perfil/relatorio" element={<Relatorios/>}></Route>
						<Route path="/perfil/imagensclientes" element={<Imagenscli/>}></Route>
						<Route path="/perfil/imagensprodutos" element={<Imagenspro/>}></Route>
						<Route path="/perfil/promocoes" element={<Promo/>}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</React.Suspense>



	);
}