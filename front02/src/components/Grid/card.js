/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Divider, Fab } from "@mui/material";
import { red, green, } from "@mui/material/colors";

import { uniqueId } from "lodash";
import { Add, AddShoppingCart } from "@mui/icons-material";
import { DadosContext } from "../../routs";


const Img = styled("img")({
	margin: "auto",


});




export default function ComplexGrid({produto, img, desc, tamanho, valor, logos, id, }) {

	// function viewKeysObj(obj){
	// 	Object.getOwnPropertyNames(obj).forEach(function (val, idx, array) {
	// 	  console.log(val + " -> " + obj[val]);
	// 	});
	//   }
	
    const [Dados,setDados]=React.useContext(DadosContext)
	const theme = useTheme()
    // console.log(Dados)
	return (


		<Paper

			elevation={3}
			sx={{

				display: "flex",
				borderRadius: 1,
				flexDirection: "column",
				fontFamily: "Roboto",
				alignItems: "center",
				justifyContent: "space-between",
				position: "relative",
				height: theme.spacing(47),

				// [theme.breakpoints.down("md")]:{
				// 	// height:theme.spacing(70)
				// }
			}}
		>
			<Fab size="small" sx={{position:"absolute",top:"2px",right:"2px"}}  color="warning" aria-label="add">
				<AddShoppingCart onClick={(e)=>{e.preventDefault();setDados(a=>{
					
					let r=[...a.carr]
					let r2=r.filter((item)=>(item.id===produto.id))
					if(r2.length==0){
						r=[...r,produto]
					}else{
					r.forEach((item,index)=>{
						
						if(item.id===produto.id){							
							!!r[index].qt?r[index].qt=r[index].qt+1:r[index].qt=(r2.length+1)
						}
					})
					}
					return({...a,carr:[...r]})
				})}} />
			</Fab>





			<Box sx={{
				height: "60%",
				width: "100%",
				[theme.breakpoints.down("md")]: {
					height: "55%"
				},
			}}>
				<Img alt={desc} src={img}
					sx={{

						height: "100%",
						width: "100%",
						objectFit: "cover",



						WebkitMaskImage: `linear-gradient(to top, transparent 0.1%, ${theme.palette.mode == "dark" ? "#000" : "#fff"} 20%)`,

					}} />
			</Box>

			{/* <Divider sx={{  width: "98%", height: 5 }} /> */}



			{logos.length > 0 && (

				<Box id={id} sx={{ display: "none", width: "100%", height: "60px", justifyContent: "space-around", margin: "0 1 0 1" }}>

					{logos.map(logo => (
						<Img key={logo.id + uniqueId()} alt='imagem' src={logo.url} sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "30px", maxWidth: "30px", objectFit: "cover" }}></Img>
					))}
				</Box>

			)}




			{logos.length > 0 ?
				<Typography
					noWrap
					sx={{ fontFamily: "Roboto", "&:hover": { cursor: "pointer" }, fontSize: "0.8em", marginBottom: 1 }}
					onClick={() => {
						if (logos.length > 0) {

							if (window.getComputedStyle(document.getElementById(id), null).display == "none") {

								document.getElementById(id).style.display = "flex";
								return;
							}
							if (window.getComputedStyle(document.getElementById(id), null).display == "flex") {

								document.getElementById(id).style.display = "none";
								return;
							}

						}
					}}
					color={red[600]}>
					CLIQUE PARA OPÇÕES
				</Typography> : null}


			<Box sx={{ height: "40%", display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center" }}>



				<Typography noWrap sx={{ fontFamily: "Roboto", width: "90%", textAlign: "center", fontStretch: "extra-condensed", fontWeight: "bold" }}  >
					{desc}
				</Typography>
				{!!tamanho &&
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "90%" }}>
						<Typography>Medida: </Typography>
						<Typography noWrap sx={{ color: "#e02141", fontStyle: "italic", fontFamily: "Roboto", fontSize: "0.8rem", pr: 1 }}> {tamanho}</Typography>

					</Box>}
				{/* <Divider sx={{width:"90%"}}></Divider> */}
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "90%", backgroundColor: theme.palette.warning.main, borderRadius: 1, padding: 1 }}>
					<Typography sx={{ color: theme.palette.getContrastText(theme.palette.warning.main) }}>Preço: </Typography>

					<Typography noWrap sx={{ color: theme.palette.getContrastText(theme.palette.warning.main), fontSize: "1.2rem", textAlign: "center", fontFamily: "Roboto", fontWeight: "bold" }}  >
						{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(valor)}
					</Typography>

				</Box>




				<Typography sx={{ fontSize: "0.7em", mt: 2 }} color={green[600]} noWrap gutterBottom variant="subtitle1" component="div">
					Verifique a disponibilidade
				</Typography>



			</Box>




		</Paper>


	);
}
