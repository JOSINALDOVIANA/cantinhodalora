
import React from "react";

import GridContainer from "../Grid";
import Promo from "../promocoes";

import { Typography } from "@mui/material";

// import { Container } from './styles';

function Produtos() {
	// const [dados] = useOutletContext();
	// console.log(dados)
   
	return (
		<div 
		style={{padding:"5px"}}
		>
			{/* Imagens clients */}
			{/* <ImagesClientes/> */}
			{/* Promoção */}
			<Typography sx={{fontSize: "1.5em", fontFamily: "Roboto"}}>Promoções</Typography>
			<Promo></Promo>
			<Typography sx={{fontSize: "1.5em", fontFamily: "Roboto"}}>Categorias</Typography>
			<GridContainer></GridContainer>
		</div>
	);
}

export default Produtos;