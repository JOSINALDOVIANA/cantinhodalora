import React, { } from "react";
import { Paper, Typography, styled, useTheme, Grid, Divider, Chip, Box } from "@mui/material";
import Button from '@mui/material/Button';
import { uniqueId } from "lodash"
import "./style.css"

import { red } from "@mui/material/colors";
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

	
	return (





		<Box
			sx={{
				margin: theme.spacing(2),
				padding: theme.spacing(2),
				overflow:"scroll"
			}}
			component="div"
		>

			<Grid
				container				
				spacing={0.9}
			>

				{proms?.promocoes?.map(i => (

					<Grid
						key={i.id + uniqueId()}
						item
						xs={12}
						sm={6}
						md={4}
						lg={2}

					>
						<Paper

							elevation={4}
							sx={{
								padding: theme.spacing(1),								
								height: "auto",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								position: "relative",
							}}
						>

							<Img alt={"test"} src={i.id_prod ? i.prod?.img?.url : i?.img?.url} sx={{ borderRadius: 0, maxWidth: 90, maxHeight: 90, width: "auto", height: "auto", overflowClipMargin: "content-box", overflow: "clip" }} />

							<Divider >
								<Chip label="Promoção"/>									
							</Divider>

							{/* <Box sx={{ display: "flex", flexDirection: "column", width: theme.spacing(30),height:"100px" }}> */}
							<Typography sx={{ textAlign: "center",  fontFamily: "Roboto" }} variant="subtitle1" component="p">
								{i.newdesc}
							</Typography>




							{/* </Box> */}

							<Box
								sx={{ flexDirection: "column", width: "100%", padding: theme.spacing(1) }}>
								{!!i.id_prod ?
									<Box sx={{ display: "flex" }}>
										<Typography noWrap sx={{ fontFamily: "Roboto",  textAlign: "initial", marginRight: theme.spacing(2) }} variant="subtitle1" >
											De
										</Typography>
										<Typography noWrap
											sx={{
												
												fontFamily: "Roboto",
												
												textAlign: "initial",
												
												color: "#ddd70",
												textDecoration: "line-through"
											}} variant="subtitle1" component="p">
											{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(i.prod.preco)}
										</Typography>
									</Box> : null}
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<Typography noWrap sx={{  marginRight: theme.spacing(2), fontFamily: "Roboto", textAlign: "initial" }} variant="subtitle1" >
										Por
									</Typography>
									<Typography noWrap sx={{ fontSize: "1.5em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", color: "#e02141" }} variant="subtitle1" component="div">
										{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(i.valpromo)}
									</Typography>
								</Box>
								<Typography sx={{ fontFamily:"Roboto", color: "#e02141" }}   variant="subtitle1" >
									OBS: Enquanto durar o estoque
								</Typography>










							</Box>
							<Box 
							component={"div"}
							sx={{width:"100%",padding:theme.spacing(1),display:"flex",justifyContent:"space-evenly"}}
							>
								<ColorButton variant="contained" sx={{}} onClick={() => {
								api.delete(`/promo?id=${i.id}`).then(r => {
									if (r.data.status) {
										alert("apagado");
										proms?.atualizarPromo(a => (a.filter(e => i.id != e.id)))
									}
								})
							}}>
								Excluir
							</ColorButton>

							<Button
								onClick={() => {
									proms?.setPromoCad({ ...i })
								}}
								variant="contained"
								color="success"
							>
								Selecionar
							</Button>
							</Box>


						</Paper>
					</Grid>

				))}

			</Grid>



		</Box>
	);
}

export default Promo02;