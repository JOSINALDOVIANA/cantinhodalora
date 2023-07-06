import { Box, Button, Grid, ImageList, ImageListItem, Paper, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api, url } from "../../../api";
import { uniqueId } from "lodash";



function Imagens() {
	const [images, setImages] = useState([]);
	useEffect(() => {
		api.get("/selectimagesP").then(r => {
			setImages(r.data.images);
		});
	}, []);

	const theme = useTheme();
	return (

		<Paper component={"div"} elevation={0}>

		<Grid sx={{ marginTop: theme.spacing(2),padding:theme.spacing(2) }} container alignItems="center" spacing={0.3} >
			{images.map((img, i) => (
				<Grid
					key={img.id + uniqueId()}
					item
					xs={6}
					sm={6}
					md={4}
					lg={3}

				>
					<Paper elevation={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "auto", padding: theme.spacing(2) }}>
						<img style={{ width: "120px", height: "120px" }} src={img.url} />

						<Button sx={{ marginTop: theme.spacing(2) }} onClick={() => {
							api.delete(`${img.delete}`).then(r => {
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

		</Paper >

	);
}

export default Imagens;