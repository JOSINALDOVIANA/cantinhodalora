
import React from "react";

import GridContainer from "../Grid";
import Promo from "../promocoes";

// import { Container } from './styles';

function Produtos() {
	// const [dados] = useOutletContext();
	// console.log(dados)
   
	return (
		<div 
		// style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}
		>
			{/* Imagens clients */}
			{/* <ImagesClientes/> */}
			{/* Promoção */}
			<Promo></Promo>
			<GridContainer></GridContainer>
		</div>
	);
}

export default Produtos;