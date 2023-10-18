
import React from "react";
import { Outlet } from "react-router-dom";
import MenuAppBar from "./appBar/index.js";
import { Box, Container, CssBaseline} from "@mui/material";

export default function Perfil() {

	return (		
		<>
		<CssBaseline/>
			<MenuAppBar></MenuAppBar>	  
		<Container sx={{mt:3,pb:3}} >
			<Outlet></Outlet>
		</Container>
		</>		
	);
}

