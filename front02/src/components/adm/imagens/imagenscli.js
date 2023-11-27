import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, useTheme } from "@mui/material";
import { uniqueId } from "lodash"
import { api } from "../../../api";
import { DadosContext } from "../../../routs";

// import { Container } from './styles';

function Imagens() {
	const theme = useTheme();
	const [images, setImages] = useState([]);
	const [Dados, setDados] = useContext(DadosContext);
	useEffect(() => {
		api.get("/imagesget", { headers: { Authorization: Dados.token } }).then(r => {
			setImages(r.data.images);
		});
	}, []);
	console.log(images)
	return (
		<Container
		// sx={{
		// 	display: "flex",
		// 	width: "100%",
		// 	height: "100vh",
		// 	overflow: "scroll",
		// 	marginTop: theme.spacing(5)
		// }}
		>

			<Grid container spacing={1} >
				{images.map(i => (
					<Grid

						key={i.key + uniqueId()}
						item
						xs={6}
						sm={6}
						md={4}
						lg={3}
					>
						<Paper
							elevation={2}
							sx={
								{
									display: "flex",
									flexDirection: "column",
									// alignItems: "center",
									height: "250px"
									// justifyContent: "center",
									// paddingBottom: theme.spacing(2),

								}
							}
						>



							<img style={{
								 width: "100%", height: "80%", objectFit: "scale-down",objectPosition:"50% 50%",pt:1
							}} src={i.url} />

							{/* <Typography >
								key:{i.key}
							</Typography> */}
							<Button
								onClick={() => {
									api.delete(`${i.delete}`,{ headers: { Authorization: Dados.token } }).then(r => {

										if (r.data.status) {


											setImages(a => ([...a.filter(i2 => (i.id != i2.id))]));
											alert("imagem apagada");
										}
										else { alert("erro ao excluir"); }
									});
								}}
								sx={{ mt: 2 }}
								variant="contained"
								color="error"
							>
								Excluir
							</Button>

						</Paper>

					</Grid>
				))}
			</Grid>



		</Container>
	);
}

export default Imagens;