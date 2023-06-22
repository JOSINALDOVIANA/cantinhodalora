import React, { useEffect, useState } from "react";
import { Paper, Typography, styled, useTheme, Grid, Badge, Divider, Chip, Box, IconButton } from "@mui/material";
import Torre from "../../assets/Torres.png";
import Carousel from 'react-material-ui-carousel'
import ComplexGrid from "../Grid/card";
import "./style.css"

import { green } from "@mui/material/colors";
import { api } from "../../api";
import { Fingerprint } from "@mui/icons-material";
import { uniqueId } from "lodash";
const Img = styled("img")({

	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});
function Promo() {
	const theme = useTheme();
	const [promo, setPromo] = useState([]);
	useEffect(() => {
		api.get("/promo").then(r => {
			setPromo(r.data.promo)
		})
	}, [])



	function Item({ i }) {
		return (
			<Box
				sx={{
					width: "100%",
					display: "flex",
					minHeight:400,
					maxHeight:400,
					justifyContent: "center",
					alignItems: "center",
					border:0

				}}
			>


				{/* <Paper

					elevation={1}
					sx={{
						padding: theme.spacing(1),
						width: "300px",
						height: "auto",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						position: "relative",
					}}
				>

					<Img alt={"test"} src={i.id_prod ? i.prod?.img?.url : i?.img?.url} sx={{ borderRadius: 0, maxWidth: 90, maxHeight: 90, width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }} />

					<Divider sx={{ margin: 0, marginTop: 2, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
						<Chip label="Promoção"


							sx={{
								color: theme.palette.mode == "light" ? "#e02141" : theme.palette.getContrastText("#000"),
								fontSize: "1em",
								//  border: "solid 1px #000" 
							}}
							variant="outlined" />
					</Divider>

					
						<Typography sx={{ fontFamily: "Roboto", textAlign:"center"}}  component="span">
							{i.newdesc}
						</Typography>




					

					<Box
						sx={{ flexDirection: "column", width: "100%", padding: 2 }}>
						{!!i.id_prod ?
							<Box sx={{ display: "flex" }}>
								<Typography noWrap sx={{ fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", marginRight: theme.spacing(2) }} variant="subtitle1" component="span">
									De
								</Typography>

								<Typography noWrap
									sx={{
										fontSize: "1em",
										fontFamily: "Roboto",
										fontWeight: 300,
										textAlign: "initial",
										// marginTop: 2,
										// color: "#ddd70",
										textDecoration: "line-through"
									}} variant="subtitle1" component="div">
									{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(i.prod.preco)}
								</Typography>
							</Box> : null}
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography noWrap sx={{ fontSize: "1em", marginRight: theme.spacing(2), fontFamily: "Roboto", fontWeight: 300, textAlign: "initial" }} variant="subtitle1" component="div">
								Por
							</Typography>
							<Typography noWrap sx={{ fontSize: "1em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", color: "#e02141" }} variant="subtitle1" component="div">
								{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(i.valpromo)}
							</Typography>
						</Box>
						<Typography sx={{ fontSize: "0.8em", color: "#e02141" }} noWrap gutterBottom variant="subtitle1" component="div">
							OBS: Enquanto durar o estoque
						</Typography>








					</Box>


				</Paper> */}

				<Paper
				elevation={0}
					sx={{

						width: "100%",
						display: "flex",						
						justifyContent:"space-between",
						alignItems:"center",
						maxHeight:400,


						[theme.breakpoints.down("sm")]: {
							
							
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center"


						}
					}}
				>
					<img
						alt={"test"}
						src={i.id_prod ? i.prod?.img?.url : i?.img?.url}
						height={300}
						width={300}
						
					/>

					<Typography sx={{ fontFamily: "Roboto", textAlign: "center" }} component="span">
						{i.newdesc}
					</Typography>

					<Box
						sx={{ 
							flexDirection: "column", 
							width: "30%", 
							padding: 2,
							[theme.breakpoints.down("sm")]:{
								width:"100%"
							} 
							}}>
						{!!i.id_prod ?
							<Box sx={{ display: "flex" }}>
								<Typography noWrap sx={{ fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", marginRight: theme.spacing(2) }} variant="subtitle1" component="span">
									De
								</Typography>

								<Typography noWrap
									sx={{
										fontSize: "1em",
										fontFamily: "Roboto",
										fontWeight: 300,
										textAlign: "initial",
										// marginTop: 2,
										// color: "#ddd70",
										textDecoration: "line-through"
									}} variant="subtitle1" component="div">
									{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(i.prod.preco)}
								</Typography>
							</Box> : null}
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography noWrap sx={{ fontSize: "1em", marginRight: theme.spacing(2), fontFamily: "Roboto", fontWeight: 300, textAlign: "initial" }} variant="subtitle1" component="div">
								Por
							</Typography>
							<Typography noWrap sx={{ fontSize: "1em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", color: "#e02141" }} variant="subtitle1" component="div">
								{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(i.valpromo)}
							</Typography>
						</Box>
						<Typography sx={{ fontSize: "0.8em", color: "#e02141" }} noWrap gutterBottom variant="subtitle1" component="div">
							OBS: Enquanto durar o estoque
						</Typography>








					</Box>




				</Paper>


			</Box>




		)
	}


	return (


		<Carousel  indicators>



			{promo?.map(i => (

				<Item key={i.id+uniqueId()} i={i}></Item>


			))}

		</Carousel>





	);
}

export default Promo;