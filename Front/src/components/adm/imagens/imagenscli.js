import { Button, ImageList, ImageListItem, Paper, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api, url } from "../../../api";

// import { Container } from './styles';

function Imagens() {
	const [images, setImages] = useState([]);
	useEffect(() => {
		api.get("/imagesget").then(r => {
			setImages(r.data.images);
		});
	}, []);
	const theme=useTheme();
	return (
		<Paper elevation={3} sx={{ display: "flex", width: "100%", height: "100vh", overflow: "scroll",marginTop:theme.spacing(5) }}>
			{/* {
        images?.map((im, i) => (
          <Paper  sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column" }} key={im.idimage} elevation={3} >

            <img style={{ width: "150px", margin: 5, height: "50%" }} src={url + "images/" + im.key + "?w=150&h=150"} alt={im.name}></img>

            <Button onClick={() => {
              api.delete(`${url}${im.delete}`).then(r => {
                let ims = [];
                if (r.data.status) {
                  
                  for (const key in images) {
                   if(key!=i){
                    ims.push(images[key])
                   }
                  }
                  setImages(ims)
                  alert("imagem apagada")
                }
                else { alert("erro ao excluir") }
              })
            }} variant="contained" color="error">Excluir</Button>



          </Paper>))
      } */}

			<ImageList sx={{ width: 500, height: 450, marginTop: 2, background: "#fff" }} cols={3} rowHeight={164}>
				{images.map((item,i) => (
					<ImageListItem sx={{ padding: 2 }} key={item.id}>
						<img
							src={url + "images/" + item.key + "?w=150&h=150"}
							srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
							alt={item.name}
							// onClick={() => { setProduto(a => ({ ...a, logos: [...a.logos, item.id] })); setLogos(a=>([...a,{...item}])) }}
							loading="lazy"
						/>
						<Button onClick={() => {
							api.delete(`${url}${item.delete}`).then(r => {
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
		</Paper>
	);
}

export default Imagens;