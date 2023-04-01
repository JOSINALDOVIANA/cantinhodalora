import React from "react";
import { Paper, Typography, styled, useTheme, Grid, Badge, Divider, Chip, Box } from "@mui/material";
import Torre from "../../assets/Torres.png";
import ComplexGrid from "../Grid/card";
import "./style.css"

import { green } from "@mui/material/colors";
const Img = styled("img")({

	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});
function Promo({ img = Torre, desc="Torre de Brahma Duplo Malte", tamanho="3,5 L", valor=50, logos = [], bg, id=1, und=48 }) {
	const theme = useTheme();
	const qt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	return (
		<Paper
			sx={{
				width: "100%",
				borderRadius: 1,
				overflow: "scroll",
				display: "flex",
				padding: theme.spacing(2),
				margin: theme.spacing(2)


			}}
			elevation={1}
		>
			<Grid container alignItems="center" spacing={0.3}>

			</Grid>
			{qt.map(i => (
				<Grid
					key={i}
					item
					xs={6}
					sm={6}
					md={4}
					lg={3}

				>
					<Paper
						className="promoblock"
						elevation={1}
						sx={{
							width: "200px",
							height: "auto",
							background: "#e02141",
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
						{/* <Badge sx={{ right: 25, top: 15, position: "absolute" }} badgeContent={58}
				color={"success"}
				max={999} >

			</Badge> */}
						<Img alt={"test"} src={img} sx={{ borderRadius: 0, maxWidth: 90, maxHeight: 90, width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }} />

						<Divider sx={{ margin: 1, marginTop: 2, width: "90%",display:"flex",justifyContent:"center",alignItems:"center" }}>
							<Chip label="Promoção"
								// icon={
								// 	<ListAlt color={"success"} />
								// }
								sx={{ color: "#fff", fontSize: "1.8em", border: "solid 1px #fff" }}
								variant="outlined" />
						</Divider>
						{logos.length > 0 && (

							<Box id={id} sx={{ display: "none", maxWidth: "130px", justifyContent: "space-around", margin: 1 }}>

								{logos.map(logo => (<Img key={logo.id} alt='imagem' src={logo.url} sx={{ height: "30%", width: "30%" }}></Img>))}
							</Box>

						)}

						<Box sx={{ flexDirection: "column", width: "100%", padding: 2 }}>

							{bg ? null : <Typography noWrap sx={{ fontSize: "1.5em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", marginTop: 2, color: "#fff" }} variant="subtitle1" component="div">
								{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor)}
							</Typography>}

							<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
								<Typography sx={{ color: "#fff", fontSize: "0.9em", fontFamily: "Roboto" }}  variant="subtitle1" component="p">
									{desc} {tamanho}
								</Typography>
								<Typography sx={{ fontSize: "0.8em",color:"#fff" }}  noWrap gutterBottom variant="subtitle1" component="div">
									Enquanto durar o estoque
								</Typography>



							</Box>




						</Box>


					</Paper>
				</Grid>
			))}


		</Paper>
	);
}

export default Promo;