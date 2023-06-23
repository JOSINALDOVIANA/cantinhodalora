
import React from "react";
import { Outlet } from "react-router-dom";
import MenuAppBar from "./appBar/index.js";
import { Box} from "@mui/material";

export default function Perfil() {

	return (		
		<Box  sx={{bgcolor:"background.paper",height:"100vh"}}>
			<MenuAppBar></MenuAppBar>	  
			<Outlet></Outlet>
		</Box>		
	);
}

