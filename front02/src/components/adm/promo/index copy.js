import React, { useEffect, useState } from "react";
import { Paper, Typography, styled, useTheme, Grid, Badge, Divider, Chip, Box } from "@mui/material";
import Button from '@mui/material/Button';
import "./style.css"

import { green, red } from "@mui/material/colors";
import { api } from "../../../api";
const Img = styled("img")({

	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(red[500]),
	backgroundColor: red[500],
	fontFamily: "Roboto",
	fontSize: "1em",
	fontWeight: "bold",
	'&:hover': {
		backgroundColor: red["A700"],

	},
}));
function Promo02({ proms }) {
	const theme = useTheme();

	// console.log(promo)
	return (





		<Box
			sx={{


				
				margin: theme.spacing(2),

				padding: theme.spacing(2)
			}}
			component="div"
		>

			<Grid
				container
				alignItems="center"
				spacing={0.9}
				direction={"row"}
				justifyContent={"center"}
				overflow={"scroll"}
				

			>

				{proms?.promocoes?.map(i => (

					<Grid
						key={i.id}
						item
						xs={6}
						sm={6}
						md={4}
						lg={2}

					>
						<Paper

							elevation={1}
							sx={{
								padding: "5px",
								// width: "250px",
								height: "400px",								
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								position: "relative",
							}}
						>

							<Img alt={"test"} src={i.id_prod ? i.prod?.img?.url : i?.img?.url} sx={{ borderRadius: 0, maxWidth: 90, maxHeight: 90, width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }} />

							<Divider sx={{ margin:"5px" }}>
								<Chip label="Promoção"


									sx={{
										color: "#e02141",
										fontSize: "1.8em",
										//  border: "solid 1px #000" 
									}}
									variant="outlined" />
							</Divider>

							{/* <Box sx={{ display: "flex", flexDirection: "column", width: theme.spacing(30),height:"100px" }}> */}
								<Typography sx={{ textAlign:"center",color: "#000", fontSize: "0.9em", fontFamily: "Roboto" }} variant="subtitle1" component="p">
									{i.newdesc}
								</Typography>




							{/* </Box> */}

							<Box
								sx={{ flexDirection: "column", width: "100%", padding: 2 }}>
								{!!i.id_prod ?
									<Box sx={{ display: "flex" }}>
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
								<Typography sx={{ fontSize: "0.8em", color: "#e02141" }} noWrap gutterBottom variant="subtitle1" component="div">
									OBS: Enquanto durar o estoque
								</Typography>










							</Box>
							<ColorButton variant="contained" sx={{}} onClick={() => {
								api.delete(`/promo?id=${i.id}`).then(r => {
									if (r.data.status) {
										alert("apagado");
										proms?.atualizarPromo(a => (a.filter(e => i.id != e.id)))
									}
								})
							}}>Excluir</ColorButton>


						</Paper>
					</Grid>

				))}

			</Grid>



		</Box>
	);
}

export default Promo02;