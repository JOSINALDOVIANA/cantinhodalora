
import React, { useContext } from "react";
import GridContainer from "../Grid";
import Promo from "../promocoes";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { DadosContext } from "../../routs";




function Produtos() {
	const [Dados, setDados] = useContext(DadosContext);
	// console.log(Dados)
	return (
		<Box>
			<Promo></Promo>
			{/* <Typography sx={{ fontSize: "1.5em", fontFamily: "Roboto" }}>Categorias</Typography> */}
			<GridContainer />
			
			
			
		</Box>
	);
}

export default Produtos;