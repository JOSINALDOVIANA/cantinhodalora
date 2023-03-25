/* eslint-disable react/prop-types */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Badge, Box, Chip } from "@mui/material";
import { red, green } from "@mui/material/colors";

// eslint-disable-next-line no-unused-vars
import { ListAlt } from "@mui/icons-material";


const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});



export default function ComplexGrid({ img, desc, tamanho, valor, logos, bg, id, und }) {

	return (


		<Paper

			elevation={0}
			sx={{
				display: "flex",
				borderRadius: 1,
				flexDirection: "column",
				fontFamily: "Roboto",
				alignItems: "center",
				background: "transparent",
				position: "relative",
				border: "solid 0.000001px #ddd",
				// background:"#ddd"



			}}
			className='card marcado'


		>



			{und > 1 ? <Badge sx={{ right: 25, top: 15, position: "absolute" }} badgeContent={und}
				color={"success"}
				max={999} >

			</Badge> : null}

			<div style={{ width: 100, height: 100, marginTop: 10, marginBottom: 2 }}>
				<Img alt={desc} src={img} sx={{ borderRadius: 0, maxWidth: 90, maxHeight: 90, width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }} />
			</div>
			<Divider sx={{ margin: 1, marginTop: 2, width: "90%" }}>
				<Chip label="Informações"
					// icon={
					// 	<ListAlt color={"success"} />
					// }
					color={"success"}
					variant="outlined" />
			</Divider>
			{/* {logos.length > 0 && <Divider color="#000" sx={{ width: "90%" }} ></Divider>} */}
			{logos.length > 0 && (

				<Box id={id} sx={{ display: "none", maxWidth: "130px", justifyContent: "space-around", margin: 1 }}>

					{logos.map(logo => (<Img key={logo.id} alt='imagem' src={logo.url} sx={{ height: "30%", width: "30%" }}></Img>))}
				</Box>

			)}

			{/* <Divider color="#000" sx={{ width: "90%" }} ></Divider> */}


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

				{bg ? null : <Typography noWrap sx={{ fontSize: "1.5em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", marginTop: 2, color: "#050A30" }} variant="subtitle1" component="div">
					{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor)}
				</Typography>}

				<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
					<Typography sx={{ color: "#404E5C", fontSize: "0.9em", fontFamily: "Roboto" }} noWrap variant="subtitle1" component="p">
						{desc} {tamanho}
					</Typography>
					<Typography sx={{ fontSize: "0.8em" }} color={green[600]} noWrap gutterBottom variant="subtitle1" component="div">
						Verifique a disponibilidade
					</Typography>



				</Box>




			</Box>




		</Paper>


	);
}
