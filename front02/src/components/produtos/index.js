
import React from "react";

import GridContainer from "../Grid";
import Promo from "../promocoes";
import Carousel from 'react-material-ui-carousel'
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { api } from "../../api";



function Produtos() {

	const theme = useTheme();
	const [imagens,setImagens]=React.useState([]);

	React.useEffect(()=>{
		api.get("/imagesget").then(r=>{
			setImagens(r.data.images)
		})
	},[]);

	

	function Item(props)
{
    return (
        <Box
		sx={{
		width:"100%",
		display:"flex",
		justifyContent:"center",
		alignItems:"center"
		}}
		>
			<Box
			sx={{
			backgroundImage:`url(${props.item.url})`,
			backgroundPosition:"center",
			backgroundRepeat:"no-repeat",
			backgroundSize:"100% 100%",
			width:"300px",
			height:"300px"
			}}
			>

			</Box>
           
        </Box>
    )
}

	return (
		<Box>

			{/* <Carousel animation="fade" indicators={false} navButtonsAlwaysVisible sx={{
				
			}}>
			{imagens.map( (item, i) => <Item key={i} item={item} /> )}
			</Carousel> */}


			<Promo></Promo>
			{/* </Box> */}
			<Typography sx={{ fontSize: "1.5em", fontFamily: "Roboto" }}>Categorias</Typography>
			<GridContainer></GridContainer>
		</Box>
	);
}

export default Produtos;