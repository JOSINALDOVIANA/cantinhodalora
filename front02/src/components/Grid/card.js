/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Badge, Box, Button, Chip } from "@mui/material";
import { red, green } from "@mui/material/colors";

// eslint-disable-next-line no-unused-vars
import { ListAlt } from "@mui/icons-material";
import { uniqueId } from "lodash";


const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});



export default function ComplexGrid({ img, desc, tamanho, valor, logos, bg, id, und }) {
	const theme = useTheme()
	return (


		<Paper

			elevation={24}
			sx={{
				display: "flex",
				borderRadius: 1,
				flexDirection: "column",
				fontFamily: "Roboto",
				alignItems: "center",
				position: "relative",
				height:theme.spacing(43)
			}}



		>



			{/* {und > 1 ? <Badge sx={{ right: 25, top: 15, position: "absolute" }} badgeContent={und}
				color={"success"}
				max={999} >

			</Badge> : null} */}

			
				<Img alt={desc} src={img} sx={{ display:"flex",justifyContent:"center",alignItems:"center",maxHeight:"100px",maxWidth:"100px", objectFit: "cover" }} />
			
			{/* <Divider sx={{ margin: 1, marginTop: 2, width: "100%", height: 5 }} /> */}



			{logos.length > 0 && (

				<Box id={id} sx={{ display: "none", width:"100%",height:"100px" ,justifyContent: "space-around", margin: 1 }}>

					{logos.map(logo => (
					<Img key={logo.id + uniqueId()} alt='imagem' src={logo.url} sx={{ display:"flex",justifyContent:"center",alignItems:"center",maxHeight:"30px",maxWidth:"30px", objectFit: "cover" }}></Img>
					))}
				</Box>

			)}




			{logos.length > 0 ? <Typography noWrap sx={{  fontFamily: "Roboto", "&:hover": { cursor: "pointer" },fontSize:"0.8em",marginBottom:1 }} onClick={() => {
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


			<Box sx={{ display: "flex", flexDirection: "column", width: "100%",  justifyContent: "center", alignItems: "center" }}>



				<Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center",marginBottom:2,width:"97%"  }}>
					<Typography noWrap sx={{ fontFamily: "Roboto",width:"90%",textAlign:"center" }}  >
						{desc}
					</Typography>
					<Typography> {tamanho}</Typography>

				</Box>
				<Button variant="contained" sx={{width:"90%","&:hover":{cursor:"default"}}} color="warning">
					<Typography noWrap sx={{ fontSize: "1rem", textAlign: "center", fontFamily: "Roboto", fontWeight: "bold" }} variant="subtitle1" component="span">
						{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor)}
					</Typography>
				</Button>

				<Typography sx={{ fontSize: "0.7em" }} color={green[600]} noWrap gutterBottom variant="subtitle1" component="div">
					Verifique a disponibilidade
				</Typography>



			</Box>




		</Paper>


	);
}
