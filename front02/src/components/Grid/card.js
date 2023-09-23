/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Badge, Box, Button, Chip } from "@mui/material";
import { red, green, purple } from "@mui/material/colors";

// eslint-disable-next-line no-unused-vars
import { ListAlt } from "@mui/icons-material";
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
					 WebkitMaskImage: `linear-gradient(to top, transparent 0.1%, ${theme.palette.mode=="dark"?"#000":"#fff"} 20%)`,
				// backgroundImage: "url(http://109.123.243.212:3009/images/3e17e289553cc7211552684fc40d5d7f-torre%20sem%20fundo.png)",
					 }} />

			{/* <Divider sx={{ margin: 1, marginTop: 2, width: "100%", height: 5 }} /> */}



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



				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 2, width: "97%" }}>
					<Typography noWrap sx={{ fontFamily: "Roboto", width: "90%", textAlign: "center", fontStretch: "extra-condensed", fontWeight: "bold" }}  >
						{desc}
					</Typography>
					<Typography sx={{ fontStyle: "italic", fontFamily: "Roboto" }}> {tamanho}</Typography>

				</Box>

				
					<Typography noWrap sx={{ color:"#e02141", fontSize: "1.5rem", textAlign: "center", fontFamily: "Roboto", fontWeight: "bold" }}  >
						{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor)}
					</Typography>
				

				<Typography sx={{ fontSize: "0.7em" }} color={green[600]} noWrap gutterBottom variant="subtitle1" component="div">
					Verifique a disponibilidade
				</Typography>



			</Box>




		</Paper>


	);
}
