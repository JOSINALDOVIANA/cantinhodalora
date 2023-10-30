/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import { red, green, } from "@mui/material/colors";

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
				justifyContent:"space-between",
				position: "relative",
				height: theme.spacing(44),

				// [theme.breakpoints.down("md")]:{
				// 	// height:theme.spacing(70)
				// }
			}}



		>






			<Box sx={{
				height:"50%",
				width:"100%",
				[theme.breakpoints.down("md")]:{
						height:"60%"
					},
					}}>
			<Img alt={desc} src={img}
				sx={{
					
					height:"100%",
					width:"100%",
					objectFit: "fill",

					
					
					WebkitMaskImage: `linear-gradient(to top, transparent 0.1%, ${theme.palette.mode == "dark" ? "#000" : "#fff"} 20%)`,

				}} />
			</Box>

			{/* <Divider sx={{  width: "98%", height: 5 }} /> */}



			{logos.length > 0 && (

				<Box id={id} sx={{ display: "none", width: "100%", height: "60px", justifyContent: "space-around", margin: "0 1 0 1" }}>

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
				{!!tamanho &&
				 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "90%" }}>
					<Typography>Medida: </Typography>
					<Typography noWrap sx={{ color: "#e02141", fontStyle: "italic", fontFamily: "Roboto", fontSize: "0.8rem",pr:1 }}> {tamanho}</Typography>

				</Box>}
				<Divider sx={{width:"90%"}}></Divider>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "90%" }}>
					<Typography>Preço: </Typography>

					<Typography noWrap sx={{ color: "#e02141", fontSize: "1.2rem", textAlign: "center", fontFamily: "Roboto", fontWeight: "bold" }}  >
						{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor)}
					</Typography>

				</Box>




				<Typography sx={{ fontSize: "0.7em", mt: 2 }} color={green[600]} noWrap gutterBottom variant="subtitle1" component="div">
					Verifique a disponibilidade
				</Typography>



			</Box>




		</Paper>


	);
}
