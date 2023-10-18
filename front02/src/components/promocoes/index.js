import React, { useEffect, useState } from "react";
import { Paper, Typography, styled, useTheme, Box } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import "./style.css"

import { api } from "../../api";
import { uniqueId } from "lodash";

const Img = styled("img")({
	margin: "auto",


});
function Promo() {
	const theme = useTheme();
	const [promo, setPromo] = useState([]);
	useEffect(() => {
		api.get("/promo").then(r => {
			setPromo(r.data.promo)
		})
	}, [])

	// console.log(promo)



	function Item({ i }) {
		return (
			




				<Paper
					elevation={1}
					sx={{
						padding:0,
						width: "100%",
						height:500,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						
						


						[theme.breakpoints.down("sm")]: {


							flexDirection: "column",
							// justifyContent: "center",
							alignItems: "center"


						}
					}}
				>
					<Box sx={{
						[theme.breakpoints.down("sm")]:{
							height:250,width:"100%"
						},
						width:"50%",
						height:500
					}}>
						<Img
							alt={"test"}
							src={i.id_prod ? i.prod?.img?.url : i?.img?.url}
							sx={{
								height: "100%",
								width: "100%",
								objectFit: "cover",
								
								[theme.breakpoints.down("md")]:{
									WebkitMaskImage: `linear-gradient(to top, transparent 0.1%, ${theme.palette.mode == "dark" ? "#000" : "#fff"} 20%)`
								},
								[theme.breakpoints.up("md")]:{
									WebkitMaskImage: `linear-gradient(to left, transparent 0.1%, ${theme.palette.mode == "dark" ? "#000" : "#fff"} 20%)`
								}
								,
							}}

						/>
					</Box>

					<Box sx={{[theme.breakpoints.down('sm')]:{
						width:"100%",
						padding:theme.spacing(5),
						height:100
					},
					width:"30%",
					height:500,
					display:"flex",
					justifyContent:"center",
					alignItems:"center",
					padding:2
					}}>
					<Typography sx={{ fontFamily: "Roboto", textAlign: "justify" }} component="span">
						{i.newdesc}
					</Typography>
					</Box>

					<Box
						sx={{
							flexDirection: "column",
							width: "30%",
							padding: 2,
							[theme.breakpoints.down("sm")]: {
								width: "100%"
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


			




		)
	}


	return (


		<Carousel indicators>



			{promo?.map(i => (

				<Item key={i.id + uniqueId()} i={i}></Item>


			))}

		</Carousel>





	);
}

export default Promo;