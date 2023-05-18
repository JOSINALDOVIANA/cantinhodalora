
import React from "react";
import { Outlet } from "react-router-dom";

import ResponsiveAppBar from "../../components/adm/appBar/appbaradm.js";
import MenuAppBar from "./appBar/index.js";
import { Box, Container } from "@mui/material";


function Perfil() {

	return (
		
		<Box flexGrow>


			<MenuAppBar></MenuAppBar>
	  
			<Outlet></Outlet>
		</Box>


		

		
	);
}

export default Perfil;