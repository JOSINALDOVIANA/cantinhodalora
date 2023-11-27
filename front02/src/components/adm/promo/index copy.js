import React, { useContext } from "react";
import { Paper, Typography, styled, useTheme, Grid, Divider, Chip, Box } from "@mui/material";
import Button from '@mui/material/Button';
import { uniqueId } from "lodash"
import "./style.css"

import { red } from "@mui/material/colors";
import { api } from "../../../api";
import { DadosContext } from "../../../routs";
const Img = styled("img")({

	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(red[500]),
	backgroundColor: red[500],
	fontFamily: "Roboto",
	fontSize: "0.8em",
	fontWeight: "bold",
	'&:hover': {
		backgroundColor: red["A700"],

	},
	'&&':{marginRight:2}
}));
function Promo02({ proms }) {
	const theme = useTheme();
	const [Dados,setDados]=useContext(DadosContext);

	
	return (





		

			<Grid sx={{p:1}}	container	spacing={0.9}>

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
																
								height: "500px",
								display: "flex",
								flexDirection: "column",
								// justifyContent: "center",
								alignItems: "center",
								position: "relative",
							}}
						>

							<Img alt={"test"} src={i.id_prod ? i.prod?.img?.url : i?.img?.url} sx={{ width:"100%",height:"50%",objectFit:"cover" }} />

							

							{/* <Box sx={{ display: "flex", flexDirection: "column", width: theme.spacing(30),height:"100px" }}> */}
							<Typography sx={{p:1, textAlign: "center",  fontFamily: "Roboto",fontSize:"0.9rem",height:"20%" }} >
								{i.newdesc}
							</Typography>




							{/* </Box> */}

							<Box
								sx={{ height:"15%",flexDirection: "column", width: "100%", padding: theme.spacing(1) }}>
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
							</Box>
							<Box 
							component={"div"}
							sx={{ height:"15%", width:"100%",padding:theme.spacing(1),display:"flex",justifyContent:"space-evenly"}}
							>
								<ColorButton variant="contained" sx={{}} onClick={() => {
								api.delete(`/promo?id=${i.id}`,{headers:{Authorization:Dados.token}}).then(r => {
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



		
	);
}

export default Promo02;