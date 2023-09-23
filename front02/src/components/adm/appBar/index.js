import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";


import { useTheme } from "@mui/material";
import { DadosContext, TrocarTheme } from "../../../routs.js";


export default function MenuAppBar() {

	const navegar = useNavigate();//usado para navegar nas rotas
	const theme = useTheme();//usado para prover as propriedades do thema
	
	
	const [Dados,setDados]=useContext(DadosContext);
    useEffect(() => {
		if (Object.keys(Dados).length>0) { return }
		navegar("/login")
	  }, [Dados])
	
	//controla o menu suspenso
	const [anchorE2, setAnchorE2] = React.useState(null);
	//controle para o menu suspenso (abrir)
	const handleMenu2 = (event) => {
		setAnchorE2(event.currentTarget);
	};
	//controle para o menu suspenso (fechar)
	const handleClose2 = () => {
		setAnchorE2(null);
	};
	

	return (
		<Box>

			<AppBar
				position="static"
				sx={{
					background: theme.palette.mode == "light" ? "#fff" : null,
					color: theme.palette.mode == "light" ? "#000" : null,
					boxShadow: 1,
					verticalAlign: "center",
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between"
					}}
				>
					<IconButton
						size="large"
						edge="start"
						aria-label="menu"
						onClick={handleMenu2}
					>
						<MenuIcon />
					</IconButton>
					<TrocarTheme />
					<Menu
						id="menu-appbar"
						anchorEl={anchorE2}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorE2)}
						onClose={handleClose2}
						sx={{ padding: theme.spacing(2) }}
					>
						<MenuItem onClick={() => { navegar("/perfil/produtosedit", { state: Dados.user }) }}>Editar Produtos</MenuItem>
						<MenuItem onClick={() => { navegar("/perfil/produtoscad", { state: Dados.user }) }}>Cadastrar Produto</MenuItem>
						<MenuItem onClick={() => { navegar("/perfil/userEdit", { state: Dados.user }) }}>Usuário/Dados</MenuItem>
						<MenuItem onClick={() => { navegar("/perfil/imagensclientes", { state: Dados.user }) }}>Imagens/Clientes</MenuItem>
						<MenuItem onClick={() => { navegar("/perfil/imagensprodutos", { state: Dados.user }) }}>Imagens/Produtos</MenuItem>
						<MenuItem onClick={() => { navegar("/perfil/promocoes", { state: Dados.user}) }}>Promoções</MenuItem>
						<MenuItem onClick={() => { navegar("/perfil/fecharCaixa", { state: Dados.user }) }}>Fechamentos</MenuItem>
						<MenuItem onClick={() => { navegar("/perfil/relatorio", { state: Dados.user }) }}>Relatotios</MenuItem>
						<MenuItem onClick={() => { navegar("/") }}>Página inicial</MenuItem>
						<MenuItem onClick={() => { delete Dados["user"]; navegar("/") }}>Sair</MenuItem>
					</Menu>
				</Toolbar>


			</AppBar>
		</Box>
	);
}
