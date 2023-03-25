/* eslint-disable react/prop-types */
import * as React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

const pages = [["Cadastrar Produto", "Editar Produto"], "Inicio", "Dados", "Fechar Caixa", "Relatório", "Imagens/clientes", "Imagens/produtos", "Promoções", "Sair"];


function ResponsiveAppBar() {
	const navegate = useNavigate();
	const d = useLocation();
	const [props, setProps] = React.useState({});

	React.useEffect(() => {
		setProps({ user: d.state });
	}, []);


	return (
		<nav style={{ height: "10%" }} className="navbar fixed-top navbar-light bg-light ">
			<div className="container-fluid ">
				<button style={{ alignItems: "center", display: "flex" }} className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
					<span style={{ width: "16px", height: "16px" }} className="navbar-toggler-icon"></span>
				</button>
				<span className="navbar-brand" >Cantinho da Lora</span>

				<div className="offcanvas offcanvas-start text-bg-light" tabIndex="-1" id="offcanvasDarkNavbar"
					aria-labelledby="offcanvasDarkNavbarLabel">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Cantinho da LORA</h5>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
							aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li onClick={() => {
								navegate("/perfil/inicio", { state: props.user });
							}} className="nav-item link bg-light">
								<span className="nav-link active " aria-current="page" >{pages[1]}</span>
							</li>
							<li onClick={() => {
								navegate("/perfil/userEdit", { state: props.user });
							}} className="nav-item link bg-light">
								<span className="nav-link" >{pages[2]}</span>
							</li>
							<li className="nav-item dropdown link bg-light">
								<span className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
									aria-expanded="false">
                  Produtos
								</span>
								<ul className="dropdown-menu dropdown-menu-light">
									<li onClick={() => {
										navegate("/perfil/produtoscad", { state: props.user });
									}}><span className="dropdown-item link bg-light" >{pages[0][0]}</span></li>
									<li onClick={() => {
										navegate("/perfil/produtosedit", { state: props.user });
									}}><span className="dropdown-item link bg-light" >{pages[0][1]}</span></li>
									{/* <li>
                    <hr className="dropdown-divider">
                  </li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li> */}
								</ul>
							</li>
							<li onClick={() => {
								navegate("/perfil/fecharCaixa");
							}} className="nav-item link  bg-light">
								<span className="nav-link" >{pages[3]}</span>
							</li>
							<li onClick={() => {
								navegate("/perfil/relatorio");
							}} className="nav-item link bg-light">
								<span className="nav-link" >{pages[4]}</span>
							</li>
							<li onClick={() => {
								navegate("/perfil/imagensclientes");
							}} className="nav-item link bg-light">
								<span className="nav-link" >{pages[5]}</span>
							</li>
							<li onClick={() => {
								navegate("/perfil/imagensprodutos");
							}} className="nav-item link bg-light">
								<span className="nav-link" >{pages[6]}</span>
							</li>
							<li onClick={() => {
								navegate("/perfil/promocoes");
							}} className="nav-item link bg-light">
								<span className="nav-link" >{pages[7]}</span>
							</li>
							<li onClick={() => {
								navegate("/");
							}} className="nav-item link bg-light">
								<span className="nav-link" >{pages[8]}</span>
							</li>

						</ul>

					</div>
				</div>
			</div>
		</nav>
	);
}
export default ResponsiveAppBar;