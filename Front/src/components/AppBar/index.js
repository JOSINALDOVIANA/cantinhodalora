import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { BsFacebook, BsInstagram, BsWhatsapp, BsArrowDownLeftSquare } from "react-icons/bs";
import ageu from "../../assets/ageu.jpg"
import naldo from "../../assets/josinaldo.jpg"
import joilson from "../../assets/joilson.jpg"



import cant from "../../assets/cantinho da lora 2.jpeg";
import { Avatar } from "@mui/material";

// eslint-disable-next-line no-unused-vars
export default function MenuAppBar(prop) {

	const navegator = useNavigate();






	const [anchorE2, setAnchorE2] = React.useState(null);




	const handleMenu2 = (event) => {
		setAnchorE2(event.currentTarget);
	};



	const handleClose2 = () => {
		setAnchorE2(null);
	};

	return (
		<Box flexGrow={1}>

			<AppBar flexGrow position="static" sx={{
				background: "#fff",
				// height: "50px",
				boxShadow: 1,
				// textAlign: "center",
				// padding: 1,
				verticalAlign: "center"

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
						sx={{ color: "#000" }}
						onClick={handleMenu2}
					>
						<MenuIcon />
					</IconButton>

					<Avatar onClick={()=>{window.open("https://api.whatsapp.com/send?phone=+5596981325410&text=Oi")}} alt="josinaldo" src={naldo} />
					<Avatar onClick={()=>{window.open("https://api.whatsapp.com/send?phone=+5596991615690&text=Oi")}} alt="joilson" src={joilson}/>
					<Avatar onClick={()=>{window.open("https://api.whatsapp.com/send?phone=+5596991674615&text=Oi")}} alt="ageu" src={ageu}/>


					<div style={{ height: "3rem", width: "3rem", background: "#000" }}>
						<img
							src={`${cant}`}
							alt="logo"
							loading="lazy"
							style={{ maxHeight: "3rem", maxWidth: "3rem", width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }}
						/>
					</div>

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
						// sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}

					>
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("http://www.instagran.com/cantinho_dalora"); handleClose2(); }}><BsInstagram color="#405DE6"></BsInstagram>Instagran</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("https://www.facebook.com/cantinhodalora"); handleClose2(); }}><BsFacebook color="#4267B2"></BsFacebook>Facebook</MenuItem>
						{/* <MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("https://api.whatsapp.com/send?phone=+5596981325410&text=Oi"); handleClose2(); }}><BsWhatsapp  color="#25D366"></BsWhatsapp>Whatsap</MenuItem> */}
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { navegator("/login") }}><BsArrowDownLeftSquare color="#e02141"></BsArrowDownLeftSquare>Login/Entrar</MenuItem>



					</Menu>




				</Toolbar>


			</AppBar>
		</Box>
	);
}
