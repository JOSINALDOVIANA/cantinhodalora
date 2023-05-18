import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { BsFacebook, BsInstagram, BsWhatsapp, BsArrowDownLeftSquare } from "react-icons/bs";

import { Avatar, useTheme } from "@mui/material";
import { TrocarTheme } from "../../../routs.js";


export default function MenuAppBar() {

	const navegator = useNavigate();
    const theme=useTheme(); 
	const d = useLocation();
	const [props, setProps] = React.useState({});

	React.useEffect(() => {
		setProps({ user: d.state });
	}, []);






	const [anchorE2, setAnchorE2] = React.useState(null);




	const handleMenu2 = (event) => {
		setAnchorE2(event.currentTarget);
	};



	const handleClose2 = () => {
		setAnchorE2(null);
	};

	return (
		<Box flexGrow>

			<AppBar flexGrow position="fixed" sx={{
				background: theme.palette.mode=="light"?"#fff":null,
				color:theme.palette.mode=="light"?"#000":null,
				
				boxShadow: 1,
				
				verticalAlign: "center",
				// marginBottom:theme.spacing(2)
				

			}}
			>
				<Toolbar sx={{
					display: "flex",
					justifyContent: "space-between"
				}}>





					<IconButton
						size="large"
						edge="start"

						aria-label="menu"
						// sx={{ color: theme.palette.mode=="dark"?"#fff":"#000" }}
						onClick={handleMenu2}
					>
						<MenuIcon />
					</IconButton>

					{/* <Avatar onClick={()=>{window.open("https://api.whatsapp.com/send?phone=+5596981325410&text=Oi")}} alt="josinaldo" src={naldo} /> */}
					{/* <Avatar onClick={()=>{window.open("https://api.whatsapp.com/send?phone=+5596991615690&text=Oi")}} alt="joilson" src={joilson}/> */}
					{/* <Avatar onClick={()=>{window.open("https://api.whatsapp.com/send?phone=+5596991674615&text=Oi")}} alt="ageu" src={ageu}/> */}
					<TrocarTheme></TrocarTheme>


					{/* <div style={{ height: "3rem", width: "3rem", background: "#000" }}>
						<img
							src={`${cant}`}
							alt="logo"
							loading="lazy"
							style={{ maxHeight: "3rem", maxWidth: "3rem", width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }}
						/>
					</div> */}

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
						sx={{padding:theme.spacing(2)}}

					>
						

						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { navegator("/perfil/produtosedit",{ state: props.user }) }}>Editar Produtos</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { navegator("/perfil/produtoscad",{ state: props.user }) }}>Cadastrar Produto</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { navegator("/perfil/userEdit",{ state: props.user }) }}>Usuário/Dados</MenuItem>



					</Menu>




				</Toolbar>


			</AppBar>
		</Box>
	);
}
