import React, {  } from "react";

import MenuAppBar from "../../components/AppBar";



import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function InicialTela() {
  
	return (




		<Box  sx={{
      
			color: "#000",
			display: "flex",
			flexDirection: "column",
			flexGrow:1
     
     
      


		}}>
      
			<MenuAppBar></MenuAppBar>
			<Outlet></Outlet>
		</Box>


	);
}

export default InicialTela;


//xs, extra pequeno: 0px
//sm, pequeno: 600px
//md, médio: 900px
// lg, grande: 1200px
// xl, extragrande: 1536px