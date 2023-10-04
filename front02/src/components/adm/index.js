
import React from "react";
import { Outlet } from "react-router-dom";
import MenuAppBar from "./appBar/index.js";
import { Box, Container} from "@mui/material";

export default function Perfil() {

	return (		
		<Container  sx={{bgcolor:"background.paper"}}>
			<MenuAppBar></MenuAppBar>	  
			<Outlet></Outlet>
		</Container>		
	);
}

