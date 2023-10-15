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


	const [Dados] = useContext(DadosContext);
	useEffect(() => {
		if (Object.keys(Dados).length > 0) { return }
		navegar("/login")
	}, [Dados, navegar])

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
					background: theme.palette.mode === "light" ? "#fff" : null,
					color: theme.palette.mode === "light" ? "#000" : null,
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
							vertical: "bottom",
							horizontal: "left",
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
						<MenuItem onClick={() => { navegar("/") }}>Página inicial</MenuItem>


						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/produtosedit"); handleClose2() }}>Editar Produtos</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/produtoscad"); handleClose2() }}>Cadastrar Produto</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/userEdit"); handleClose2() }}>Usuário/Dados</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/imagensclientes"); handleClose2() }}>Imagens/Clientes</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/imagensprodutos"); handleClose2() }}>Imagens/Produtos</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/promocoes"); handleClose2() }}>Promoções</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/fecharCaixa"); handleClose2() }}>Fechamentos</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/relatorio"); handleClose2() }}>Relatotios</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { navegar("/perfil/clientes"); handleClose2() }}>Clientes</MenuItem>}
						{!!Dados?.user?.adm && <MenuItem onClick={() => { delete Dados["user"]; navegar("/") }}>Sair</MenuItem>}


					</Menu>
				</Toolbar>


			</AppBar>
		</Box>
	);
}
