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

				<Grid container spacing={1} >
					{images.map(i=>(
						<Grid
						flexGrow={1}
						key={i.key}
						item
						xl={2}
						xs={12}
						md={4}
						sm={12}
						>
							<Paper
							sx={
								{
									display:"flex",
									flexDirection:"column",
									alignItems:"center",
									justifyContent:"center"
								}
							}
							>
								<Box 
								component={"div"}
								sx={{
									backgroundImage:`url(${i.url})`,
									backgroundRepeat:"no-repeat",
									backgroundPosition:"center",
									backgroundSize:"50% 50%",
									height: "400px",
									width: "100%",
								}}
								/>
								<Typography>
									key:{i.key}
								</Typography>
								<Button onClick={() => {
							api.delete(`${i.delete}`).then(r => {
								
								if (r.data.status) {

									
									setImages(a=>([...a.filter(i2=>(i.id!=i2.id))]));
									alert("imagem apagada");
								}
								else { alert("erro ao excluir"); }
							});
						}} variant="contained" color="error">Excluir</Button>

							</Paper>

						</Grid>
					))}
				</Grid>
			

			{/* <ImageList sx={{ width: "100%", height: "100%", marginTop: 2 }} cols={3} rowHeight={164}>
				{images.map((item, i) => (
					<ImageListItem sx={{ padding: 2 }} key={item.id}>
						<img
							src={item.url}
							
							alt={item.name}
							
							loading="lazy"
						/>
						<Button onClick={() => {
							api.delete(`${item.delete}`).then(r => {
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
					</ImageListItem>
				))}
			</ImageList> */}
		</Box>
	);
}

export default Imagens;