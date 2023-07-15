/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Badge, Box, Chip } from "@mui/material";
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
 const theme=useTheme()
	return (


		<Paper

			elevation={1}
			sx={{
				display: "flex",
				borderRadius: 1,
				flexDirection: "column",
				fontFamily: "Roboto",
				alignItems: "center",				
				position: "relative",
				// boxShadow:`0px 0px 5px 0 ${theme.palette.mode=="dark"?"#fff":"#000"}`
				



			}}
			


		>



			{und > 1 ? <Badge sx={{ right: 25, top: 15, position: "absolute" }} badgeContent={und}
				color={"success"}
				max={999} >

			</Badge> : null}

			<Box component={"div"} sx={{height: "100px", marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
				<Img alt={desc} src={img} sx={{ borderRadius: 0, maxWidth: 90, maxHeight: 90, width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }} />
			</Box>
			<Divider sx={{ margin: 1, marginTop: 2, width: "100%",height:5 }}/>
				
			
			
			{logos.length > 0 && (

				<Box id={id} sx={{ display: "none", maxWidth: "130px", justifyContent: "space-around", margin: 1 }}>

					{logos.map(logo => (<Img key={logo.id+uniqueId()} alt='imagem' src={logo.url} sx={{ height: "30%", width: "30%" }}></Img>))}
				</Box>

			)}

			


			{logos.length > 0 ? <Typography noWrap sx={{ fontSize: "0.6em", fontFamily: "Roboto", "&:hover": { cursor: "pointer" } }} onClick={() => {
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
			</Typography> : <div style={{ height: "0.9em", width: "100%" }}></div>}


			<Box sx={{ flexDirection: "column", width: "100%", padding: 2 }}>

				{bg ? null : <Typography noWrap sx={{ fontSize: "1.5em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", marginTop: 2,color: theme.palette.mode=="light"?"#050A30":theme.palette.getContrastText("#000") }} variant="subtitle1" component="div">
					{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor)}
				</Typography>}

				<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
					<Typography sx={{ color:theme.palette.mode=="light"? "#404E5C":theme.palette.getContrastText("#000"), fontSize: "0.9em", fontFamily: "Roboto" }} noWrap variant="subtitle1" component="p">
						{desc} {tamanho}
					</Typography>
					<Typography sx={{ fontSize: "0.7em" }} color={green[600]} noWrap gutterBottom variant="subtitle1" component="div">
						Verifique a disponibilidade
					</Typography>



				</Box>




			</Box>




		</Paper>


	);
}
