
import React from "react";

import GridContainer from "../Grid";
import Promo from "../promocoes";

import { Box, Typography, useTheme } from "@mui/material";

// import { Container } from './styles';

function Produtos() {
	// const [dados] = useOutletContext();
	// console.log(dados)
	const theme=useTheme()
   
	return (
		<div 
		style={{padding:theme.spacing(1)}}
		>
			{/* Imagens clients */}
			{/* <ImagesClientes/> */}
			{/* Promoção */}
			<Typography sx={{fontSize: "1.5em", fontFamily: "Roboto"}}>Promoções</Typography>
			{/* <Box sx={{flexFlow:1,height:"450px",marginBottom:theme.spacing(1),marginTop:theme.spacing(1)}}> */}

			<Promo></Promo>
			{/* </Box> */}
			<Typography sx={{fontSize: "1.5em", fontFamily: "Roboto"}}>Categorias</Typography>
			<GridContainer></GridContainer>
		</div>
	);
}

export default Produtos;