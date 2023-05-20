import { Box, Button, ImageList, ImageListItem, Paper, useTheme } from "@mui/material";
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
			

			<ImageList sx={{ width: "100%", height: "100%", marginTop: 2 }} cols={3} rowHeight={164}>
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
			</ImageList>
		</Box>
	);
}

export default Imagens;