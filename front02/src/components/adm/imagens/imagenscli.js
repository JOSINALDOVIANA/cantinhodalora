import { Box, Button, Grid, ImageList, ImageListItem, Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api, url } from "../../../api";

// import { Container } from './styles';

function Imagens() {
	const theme = useTheme();
	const [images, setImages] = useState([]);
	useEffect(() => {
		api.get("/imagesget").then(r => {
			setImages(r.data.images);
		});
	}, []);
	console.log(images)
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				height: "100vh",
				overflow: "scroll",
				marginTop: theme.spacing(5)
			}}>

			<Grid container spacing={0.2} >
				{images.map(i => (
					<Grid

						key={i.key}
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
									alignItems: "center",
									justifyContent: "center",
									paddingBottom: theme.spacing(2),
									
								}
							}
						>
							<Box
								component={"div"}
								sx={{
									backgroundImage: `url(${i.url})`,
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center",
									backgroundSize: "50% 50%",
									height: "400px",
									width: "100%",
								}}
							/>
							{/* <Typography >
								key:{i.key}
							</Typography> */}
							<Button onClick={() => {
								api.delete(`${i.delete}`).then(r => {

									if (r.data.status) {


										setImages(a => ([...a.filter(i2 => (i.id != i2.id))]));
										alert("imagem apagada");
									}
									else { alert("erro ao excluir"); }
								});
							}} variant="contained" color="error">Excluir</Button>

						</Paper>

					</Grid>
				))}
			</Grid>



		</Box>
	);
}

export default Imagens;