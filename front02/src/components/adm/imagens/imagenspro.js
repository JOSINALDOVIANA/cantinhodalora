import { Button, Container, CssBaseline, Grid, Paper, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../api";
import { uniqueId } from "lodash";
import { DadosContext } from "../../../routs";



function Imagens() {
	const [images, setImages] = useState([]);
	const [Dados, setDados] = useContext(DadosContext);
	useEffect(() => {
		api.get("/selectimagesP").then(r => {
			setImages(r.data.images);
		});
	}, []);

	const theme = useTheme();
	return (

		<>
			<CssBaseline></CssBaseline>
			<Container>

				<Grid container spacing={1} >
					{images.map((img, i) => (
						<Grid
							key={img.id + uniqueId()}
							item
							xs={6}
							sm={6}
							md={4}
							lg={3}

						>
							<Paper
								elevation={2}
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									height: "300px",
									
								}}
							>
								<img style={{ 
									
									width: "100%", 
									height: "70%",
									objectFit:"cover",
									
									}}
									alt={img.desc} 
									src={img.url} 
									/>
								{/* <Typography>{img.key}</Typography> */}

								<Button sx={{ marginTop: theme.spacing(2) }} onClick={() => {
									api.delete(`${img.delete}`, { headers: { Authorization: Dados.token } }).then(r => {
										let ims = [];
										if (r.data.status) {

											for (const key in images) {
												if (key != i) {
													ims.push(images[key]);
												}
											}
											setImages(ims);
											alert("imagem apagada");
										}
										else { alert("erro ao excluir"); }
									});
								}} variant="contained" color="error">Excluir</Button>
							</Paper>
						</Grid>
					))}
				</Grid>

			</Container >
		</>


	);
}

export default Imagens;