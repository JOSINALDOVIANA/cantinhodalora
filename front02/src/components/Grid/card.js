/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {  Box, Divider} from "@mui/material";
import { red, green,  } from "@mui/material/colors";

import { uniqueId } from "lodash";


const Img = styled("img")({
	margin: "auto",

	
});

// const ColorButton = styled(Button)(({ theme }) => ({
// 	color: theme.palette.getContrastText(green[900]),
// 	backgroundColor: green[900],
// 	'&:hover': {
// 	  backgroundColor: green[500],
// 	},
//   }));



export default function ComplexGrid({ img, desc, tamanho, valor, logos, bg, id, und }) {
	const theme = useTheme()
	return (


		<Paper

			elevation={3}
			sx={{
				
				display: "flex",
				borderRadius: 1,
				flexDirection: "column",
				fontFamily: "Roboto",
				alignItems: "center",
				position: "relative",
				height: theme.spacing(44)
			}}



		>






			<Img alt={desc} src={img} 
			sx={{ 
				display: "flex",
				 justifyContent: "center",
				  alignItems: "center",
				   maxHeight: "100px",
				    maxWidth: "100px",
					 objectFit: "cover",
					//  boxShadow: "rgba(236, 241, 235, 0.836) 5px 5px, rgba(241, 233, 238, 0.3) 10px 10px, rgba(142, 150, 140, 0.2) 15px 15px, rgba(173, 185, 176, 0.1) 20px 20px, rgba(182, 174, 178, 0.05) 25px 25px",
					 WebkitMaskImage: `linear-gradient(to top, transparent 0.1%, ${theme.palette.mode=="dark"?"#000":"#fff"} 20%)`,
				
					 }} />

			{/* <Divider sx={{  width: "98%", height: 5 }} /> */}



			{logos.length > 0 && (

				<Box id={id} sx={{ display: "none", width: "100%", height: "60px", justifyContent: "space-around", margin: 1 }}>

					{logos.map(logo => (
						<Img key={logo.id + uniqueId()} alt='imagem' src={logo.url} sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "30px", maxWidth: "30px", objectFit: "cover" }}></Img>
					))}
				</Box>

			)}




			{logos.length > 0 ?
				<Typography
					noWrap
					sx={{ fontFamily: "Roboto", "&:hover": { cursor: "pointer" }, fontSize: "0.8em", marginBottom: 1 }}
					onClick={() => {
						if (logos.length > 0) {

							if (window.getComputedStyle(document.getElementById(id), null).display == "none") {

								document.getElementById(id).style.display = "flex";
								return;
							}
							if (window.getComputedStyle(document.getElementById(id), null).display == "flex") {

								document.getElementById(id).style.display = "none";
								return;
							}

						}
					}}
					color={red[600]}>
					CLIQUE PARA OPÇÕES
				</Typography> : null}


			<Box sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center" }}>



					<Typography noWrap sx={{ fontFamily: "Roboto", width: "90%", textAlign: "center", fontStretch: "extra-condensed", fontWeight: "bold" }}  >
						{desc}
					</Typography>
				<Box sx={{ display: "flex",  alignItems: "center",justifyContent:"space-between", width:"90%" }}>
					<Typography>Medida: </Typography>
					<Typography sx={{ fontStyle: "italic", fontFamily: "Roboto",fontSize:"0.8rem" }}> {tamanho}</Typography>

				</Box>
				<Box sx={{ display: "flex",  alignItems: "center",justifyContent:"space-between", width:"90%" }}>
					<Typography>Valor: </Typography>
					
					<Typography noWrap sx={{ color:"#e02141", fontSize: "1.2rem", textAlign: "center", fontFamily: "Roboto", fontWeight: "bold" }}  >
						{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor)}
					</Typography>

				</Box>

				
				

				<Typography sx={{ fontSize: "0.7em",mt:2 }} color={green[600]} noWrap gutterBottom variant="subtitle1" component="div">
					Verifique a disponibilidade
				</Typography>



			</Box>




		</Paper>


	);
}
