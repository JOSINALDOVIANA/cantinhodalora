
import React from "react";
import { Outlet } from "react-router-dom";

import ResponsiveAppBar from "../../components/adm/appBar/appbaradm.js";
import MenuAppBar from "./appBar/index.js";
import { Box, Container, useTheme } from "@mui/material";


function Perfil() {
const theme=useTheme()
	return (
		
		<Box  sx={{bgcolor:"background.paper"}}>


			<MenuAppBar></MenuAppBar>
	  
			<Outlet></Outlet>
		</Box>


		

		
	);
}

export default Perfil;