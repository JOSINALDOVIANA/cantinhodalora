
import React from "react";
import GridContainer from "../Grid";
import Promo from "../promocoes";
import { Box, Typography, useTheme } from "@mui/material";




function Produtos() {
	
	return (
		<Box>
			<Promo></Promo>
			<Typography sx={{ fontSize: "1.5em", fontFamily: "Roboto" }}>Categorias</Typography>
			<GridContainer/>
		</Box>
	);
}

export default Produtos;