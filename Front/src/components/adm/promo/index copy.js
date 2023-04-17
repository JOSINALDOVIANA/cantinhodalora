import React, { useEffect, useState } from "react";
import { Paper, Typography, styled, useTheme, Grid, Badge, Divider, Chip, Box, Button } from "@mui/material";

import "./style.css"

import { green } from "@mui/material/colors";
import { api } from "../../../api";
const Img = styled("img")({

	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});
function Promo({ bg }) {
	const theme = useTheme();
	const [promo, setPromo] = useState([]);
	useEffect(() => {
		api.get("/promo").then(r => {
			setPromo(r.data.promo)
		})
	}, [])
	console.log(promo)
	return (

		<Grid  sx={{ overflow: "scroll", margin: theme.spacing(3),padding:theme.spacing(1) }} container spacing={1}>

			{promo?.map(i => (
				<Grid
					key={i}
					item
					xs={6}
					sm={6}
					md={4}
					lg={3}

				>
					<Paper

						elevation={2}
						sx={{
							width: "200px",
							height: "auto",

							"& ": {
								marginRight: theme.spacing(2)
							},
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
						}}
					>

						<Img alt={"test"} src={i.id_prod ? i.prod.img.url : i.img.url} sx={{ borderRadius: 0, maxWidth: 90, maxHeight: 90, width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }} />

						<Divider sx={{ margin: 1, marginTop: 2, width: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
							<Chip label="Promoção"


								sx={{ color: "#e02141", fontSize: "1.8em", border: "solid 1px #000" }}
								variant="outlined" />
						</Divider>

						<Box sx={{ }}>
							<Typography sx={{ color: "#000", fontSize: "0.9em", fontFamily: "Roboto" }} variant="subtitle1" component="p">
								{i.newdesc}
							</Typography>




						</Box>

						<Box sx={{ flexDirection: "column", width: "100%", padding: 2 }}>
							{!!i.id_prod ? <Box sx={{
								display: "flex"

							}}>
								<Typography noWrap sx={{ fontSize: "1em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", marginRight: theme.spacing(2) }} variant="subtitle1" component="div">
									De
								</Typography>
								<Typography noWrap
									sx={{
										fontSize: "1em",
										fontFamily: "Roboto",
										fontWeight: 300,
										textAlign: "initial",
										// marginTop: 2,
										color: "#ddd70",
										textDecoration: "line-through"
									}} variant="subtitle1" component="div">
									{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(i.prod.preco)}
								</Typography>
							</Box> : null}
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Typography noWrap sx={{ fontSize: "1em", marginRight: theme.spacing(2), fontFamily: "Roboto", fontWeight: 300, textAlign: "initial" }} variant="subtitle1" component="div">
									Por
								</Typography>
								<Typography noWrap sx={{ fontSize: "1.5em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", color: "#e02141" }} variant="subtitle1" component="div">
									{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(i.valpromo)}
								</Typography>
							</Box>
							<Typography sx={{ fontSize: "0.8em", color: "#045043" }} noWrap gutterBottom variant="subtitle1" component="div">
								Enquanto durar o estoque
							</Typography>

							<Button onClick={()=>{
								api.delete(`/promo?id=${i.id}`).then(r=>{
									if(r.data.status){
										alert("apagado");
										setPromo(a=>(a.filter(e=>i.id!=e.id)))
									}
								})
							}}>Excluir</Button>








						</Box>


					</Paper>
				</Grid>
			))}

		</Grid>




	);
}

export default Promo;