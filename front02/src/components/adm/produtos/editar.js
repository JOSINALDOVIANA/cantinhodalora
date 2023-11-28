import { Avatar, Box, Button, CssBaseline, Divider, FormControl, FormLabel, Grid, Modal, Paper, TextField, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { api, url } from "../../../api";
import { uniqueId } from "lodash";


import "./styleeditar.css";
import Swal from "sweetalert2";
import { DadosContext } from "../../../routs";


const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	// overflow: "scroll",
	bgcolor: "background.paper",
	overflow: "scroll",

	p: 4,
};
const BoxStyle = styled(Paper)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	border: '0.5px solid #000',
	[theme.breakpoints.up("sm")]: { width: "70vw" },
	overflow: "scroll"
}))

const ButtonStyle = styled(Button)(({ theme }) => ({
	margin: theme.spacing(1),
	padding: theme.spacing(1)
}))

const Img = styled("img")({
	margin: "auto",

	maxWidth: "100%",
	maxHeight: "100%",
});
function Produtosedit() {

	const theme = useTheme();
	const [produtos, setProd] = React.useState([]);
	const [selectprod, setSelectP] = React.useState({ index: "", id: "", prod: {} });
	const [imagens, setIMG] = React.useState([]);
	const [logos, setL] = React.useState([]);
	const [categorias, setCatgorias] = React.useState([]);
	const [Dados,setDados]=React.useContext(DadosContext)

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [openL, setOpenL] = React.useState(false);
	const handleOpenL = () => setOpenL(true)

	const handleCloseL = () => setOpenL(false);


	const [openE, setOpenE] = React.useState(false);

	const handleOpenE = () => setOpenE(true);

	const handleCloseE = () => setOpenE(false);

	const [openC, setOpenC] = React.useState(false);
	const handleOpenC = () => setOpenC(true);
	const handleCloseC = () => setOpenC(false);


	const [openTeste, setOpenTeste] = React.useState(false);
	const handleOpenTeste = () => setOpenTeste(true);
	const handleCloseTeste = () => setOpenTeste(false);


	//carregar todos os produtos
	React.useEffect(() => {
		api.get("/produtos").then(r => {
			let p = r.data.produtos;
			if (r.data.status) {


				setProd(p);
			}
		});
	}, []);

	//carrega todas as imagens
	React.useEffect(() => {

		api.get("/selectimagesP").then(r => {
			if (r.data.status) {

				setIMG(r.data.images);
			}
		});
	}, []);

	//carrega as categorias
	React.useEffect(() => {
		api.get("/categorias").then(r => {
			setCatgorias(r.data.categorias);
		});
	}, []);

	// console.log(selectprod)


	return (
		<>
			<CssBaseline />
			<Grid container alignItems="center" spacing={2}>
				{produtos?.map((p, index) => (
					<Grid key={p.id + "prod" + uniqueId()} item xs={6} sm={4} md={3} lg={2}>
						<Paper
							elevation={4}
							sx={{
								height: 300,
								display: "flex",
								flexDirection: "column",
								overflow: "hidden"
							}}
							onClick={() => {
								setSelectP({ id: p.id, index, prod: p }); handleOpenTeste();
							}}
						>
							<Box sx={{ height: "70%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
								<Img
									alt={p.desc}
									src={p?.img?.url}
									sx={{
										width: "100%",
										objectFit: "cover",
										height: "100%",
										WebkitMaskImage: `linear-gradient(to top, transparent 0.1%, ${theme.palette.mode == "dark" ? "#000" : "#fff"} 20%)`,
									}}
								/>
							</Box>

							<Box sx={{ p: 1, height: "30%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>

								<Box sx={{ display: "flex", justifyContent: "center" }}>

									<Typography noWrap sx={{ fontWeight: "bold" }}> {p.desc} </Typography>
								</Box>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography sx={{ fontSize: "0.8rem" }}> Tam.:  </Typography>
									<Typography noWrap sx={{ fontFamily: "source-code-pro", fontSize: "0.8rem" }}> {p.tam} </Typography>

								</Box>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography sx={{ fontSize: "0.8rem" }}> Quant.:  </Typography>
									<Typography sx={{ fontFamily: "source-code-pro", fontSize: "0.8rem" }}> {p.und} UND </Typography>
								</Box>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography sx={{ fontSize: "0.8rem" }}> Preço:  </Typography>
									<Typography sx={{ color: "#e02141", fontSize: "1.2rem", textAlign: "center", fontFamily: "Roboto", fontWeight: "bold" }}> {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 }).format(p.preco)} </Typography>

								</Box>

							</Box>

						</Paper>
					</Grid>
				))}

			</Grid>

			{/* -----MOdal para fotos de produtos---- */}
			<Modal
				open={open}
				onClose={() => {
					handleClose();
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<BoxStyle sx={{ height: "90%", width: "80%" }} >



					<Grid sx={{ p: 1 }} container alignItems="center" spacing={1} >
						{imagens?.map((item) => (
							<Grid
								// direction={theme.breakpoints.down("md") ? "column" : "row"}
								key={item.id + uniqueId()}
								item
								xs={6}
								sm={6}
								md={4}
								lg={2}

							>
								<Box sx={{ width: "100%", height: "100%" }}>
									<Img
										src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
										alt={item.name}
										onClick={() => {
											setSelectP(a => ({ ...a, prod: { ...a.prod, img: item, id_image: item.id } }));
											handleClose();
										}}
										loading="lazy"
										sx={{
											width: "100%",
											objectFit: "fill",
											height: "100%",
											// WebkitMaskImage: `linear-gradient(to top, transparent 0.1%, ${theme.palette.mode == "dark" ? "#000" : "#fff"} 20%)`,
										}}
									/>

								</Box>
							</Grid>

						))}
					</Grid>
				</BoxStyle>
			</Modal>

			{/* -----Modal para Logos------ */}
			<Modal
				open={openL}
				onClose={() => {
					handleCloseL();
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<BoxStyle sx={{ height: "90%", width: "90%" }}>


					<Grid sx={{ p: 1 }} container alignItems="center" spacing={1}  >
						{imagens.map(item => (
							<Grid
								key={item.id + uniqueId()}
								item
								xs={6}
								sm={6}
								md={3}
								lg={3}
							>
								<Img
									alt={item.name}
									src={item.url + "?w=164&h=164&fit=crop&auto=format"}
									sx={{
										width: "100%",
										objectFit: "cover",
										height: "100%",
										// WebkitMaskImage: `linear-gradient(to top, transparent 0.1%, ${theme.palette.mode == "dark" ? "#000" : "#fff"} 20%)`,
									}}
									onClick={() => {

										if (selectprod.prod.logos.filter(i => (i.id === item.id)).length > 0) {
											
											setSelectP(a => ({ ...a, prod: { ...a.prod, logos: a.prod.logos.filter(i => (i.id != item.id)) } }));

										}
										else {
											

											setSelectP(a => ({ ...a, prod: { ...a.prod, logos: [...a.prod.logos, item] } }));
										}


									}}
								/>


							</Grid>
						))}
					</Grid>
				</BoxStyle>
			</Modal>


			{/* Modal categorias */}
			<Modal
				open={openC}
				onClose={() => {

					handleCloseC();
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<BoxStyle sx={{ width: "90vw", height: "auto" }}>

					<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
						<Typography>
							Cadastradas
						</Typography>
						<Box sx={{}}>
							{
								selectprod?.prod?.cat?.map(cat => (
									<Button
										sx={{ "&": { margin: 1 } }}
										variant="contained"
										color="success"
										key={cat.id + uniqueId()}
										onClick={() => {
											let c = selectprod.prod.cat;
											c = c.filter(i => i.id != cat.id);
											setSelectP(a => ({ ...a, prod: { ...a.prod, cat: c } }));
										}}
									>
										{cat.desc}
									</Button>
								))
							}
						</Box>

					</Box>
					<Box>
						<Typography>
							Todas
						</Typography>
						{categorias.map(cat => (
							<Button sx={{ margin: 1 }} variant="contained" color="error" key={cat.id + uniqueId()} onClick={() => {
								setSelectP(a => ({ ...a, prod: { ...a.prod, cat: [...a.prod.cat, { ...cat }] } }));
							}}>{cat.desc}</Button>
						))}
					</Box>
				</BoxStyle>
			</Modal>
			{/* Modal editar dados*/}
			<Modal

				open={openTeste}
				onClose={() => {

					handleCloseTeste();
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<BoxStyle sx={{
					display: "flex",
					flexDirection: "column",
					fontFamily: "Roboto",

					width: "70%",
					height: "90vh",
					alignItems:"center"

				}}

				>
					<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "40%" }}>
						<Img
							onClick={() => { handleOpen(); }}
							alt={selectprod.prod.desc}
							src={selectprod?.prod?.img?.url}
							sx={{ width: "100%", height: "100%", objectFit: "cover", [theme.breakpoints.up("md")]: { display: "none" } }} />
						<Avatar
						onClick={() => { handleOpen(); }}
							sx={{ [theme.breakpoints.down("md")]: { display: "none" }, width: 100, height: 100 }}
							src={url + "images/" + selectprod?.prod?.img?.key}
							alt={selectprod.prod.desc}

						/>

					</Box>






					<Box

						onClick={() => {
							handleOpenL(selectprod?.prod?.logos);
						}}

						sx={{ border: "dashed 1px #ddd5", m: 1, display: "flex", alignItems: "center", justifyContent: "space-evenly", marginBottom: 1, height: "5%", width: "90%", padding: 2 }}>
						{selectprod?.prod?.logos?.map(item => (
							<Avatar
								// onClick={()=>{
								// 	setSelectP(a=>({...a,prod:{...a.prod,logos:a.prod.logos.filter(i=>(i.id!=item.id))}}))
								// }} 
								key={item.id + uniqueId()}
								sx={{ width: "auto", height: "3vh",objectFit:"contain" }}
								src={item.url}
								alt={item.desc}
							>
							</Avatar>))}
					</Box>


					{/* <Typography sx={{ fontFamily: "Roboto", textAlign: "center" }} noWrap variant="subtitle1" component="p">
						{selectprod.prod.desc + " " + selectprod.prod.tam}
					</Typography> */}







					{/* entradas de texto */}

					<Box
						sx={{ display: "flex", marginTop: theme.spacing(2), alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%" }}

					>
						<FormControl sx={{ width: "90%" }}>
							<TextField sx={{ marginBottom: 1 }}
								value={selectprod.prod.desc}
								onChange={(e) => setSelectP(a => ({ ...a, prod: { ...a.prod, desc: e.target.value } }))}
								type="text" label="Descrição"
							></TextField>

							<TextField sx={{ marginBottom: 1 }}
								value={selectprod.prod.tam}
								onChange={(e) => setSelectP(a => ({ ...a, prod: { ...a.prod, tam: e.target.value } }))}
								type="text" label="Tamanho"></TextField>

							<TextField sx={{ marginBottom: 1 }}
								value={selectprod.prod.preco}
								onChange={(e) => setSelectP(a => ({ ...a, prod: { ...a.prod, preco: e.target.value } }))}
								type="number" label="Preço/UND"></TextField>
							<TextField sx={{ marginBottom: 1 }}
								value={selectprod.prod.und}
								onChange={(e) => setSelectP(a => ({ ...a, prod: { ...a.prod, und: e.target.value } }))}
								type="number" label="Quantidade"></TextField>
						</FormControl>
					</Box>

					{/* botoes */}


					<FormControl sx={{ display: "flex", flexDirection: "row", [theme.breakpoints.down('md')]: { flexDirection: "column" }, width: "100%", justifyContent: "center", alignItems: "center" }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-around",
								[theme.breakpoints.down("md")]: { width: "100%" }
							}}
						>
							<ButtonStyle
								variant='contained'
								color='success'
								sx={{ [theme.breakpoints.down('md')]: { width: "49%" } }}
								onClick={(e) => {
									e.preventDefault();

									api.put("/produtos", { ...selectprod.prod, cat: selectprod.prod.cat.map(c => (c.id)), logos: selectprod.prod.logos.map(l => (`${l.id}`)) },{headers:{Authorization:Dados.token}}).then(r => {
										if (r.data.status) {
											Swal.fire(
												"Atualizado!",
												"",
												"success"
											);
											setProd(a => {
												let ProdAnteriores = a;
												ProdAnteriores[selectprod.index] = selectprod.prod;

												return (ProdAnteriores);
											});
											handleCloseTeste();
										} else {
											Swal.fire(
												"Error!",
												"",
												"error"
											);
											handleCloseTeste();
										}
									});
								}}
							>
								Salvar
							</ButtonStyle>
							<ButtonStyle
								variant='contained'
								color='info'
								sx={{ [theme.breakpoints.down('md')]: { width: "49%" } }}
								onClick={() => {
									handleOpenC();
								}}
							>
								Categorias
							</ButtonStyle>
						</Box>
						<Box
							sx={{
								display: "flex",
								p:1,
								justifyContent: "space-around",
								[theme.breakpoints.down("md")]: { width: "100%" }
							}}
						>

							<FormLabel
								sx={{
									padding: 1,
									textAlign: "center",
									cursor: "pointer",
									borderRadius: 1,
									backgroundColor: "var(--primary)",
									color: theme.palette.getContrastText("#8257e5"),
									'&:hover': {
										opacity: 0.50
									},
									[theme.breakpoints.down("md")]:{width:"100%"}
								}} htmlFor='foto'
							>
								{"Carregar Foto".toUpperCase()}
							</FormLabel>
							<input id='foto' hidden accept="image/*" type="file"
								onChange={(ee) => {


									const files = ee.target.files;
									let uploadedFiles = []


									for (let iterator of files) {

										uploadedFiles.push(
											{
												"file": iterator,
												"id": uniqueId(),//definindo um id unico 
												"name": iterator.name,
												"prod": false,
												"readableSize": iterator.size,
												preview: URL.createObjectURL(iterator), // criando um link para preview da foto carregada
												url: URL.createObjectURL(iterator),// sera usado para setar a variavel img no proprietario/index.js
											}
										)
									}



									// CRIANDO UM DATAFORM
									const data = new FormData();
									data.append('file', uploadedFiles[0].file, uploadedFiles[0].name);

									// SALVANDO NOVA IMAGEM
									// console.log(data)

									if (!!Dados.user) {
										try {
											api.post(`/insertImageP`, data, {
												headers:{Authorization:Dados.token}
												// onUploadProgress: async e => {
												// 	let progr = parseInt(Math.round((e.loaded * 100) / e.total));
												// 	setProgress(a => {
												// 		if (a >= 100) { return 0 + progr }
												// 		return a + progr
												// 	})
												// }
											}).then(r => {

												Swal.fire(
													'Imagem Salva!',
													'',
													'success'
												)



											})

										} catch (error) {
											// console.log(error)
											alert("formato nao aceito");
										}
									}
								}}
							/>

						</Box>

						<Box
							sx={{
								display: "flex",
								justifyContent: "space-around",
								[theme.breakpoints.down("md")]: { width: "100%" }
							}}
						>
							<ButtonStyle
								variant='contained'
								color='error'

								onClick={() => {
									api.delete(`/produtos?id=${selectprod.prod.id}`,{headers:{Authorization:Dados.token}}).then(r => {
										if (r.data.status) {
											let pr = produtos.filter(item => item.id != selectprod.prod.id);

											setProd(pr);

											handleCloseTeste();
										}
									});
								}
								}
								sx={{ [theme.breakpoints.down('md')]: { width: "49%" } }}

							>
								Excluir
							</ButtonStyle>
							<ButtonStyle
								variant='contained'
								color='warning'
								sx={{ [theme.breakpoints.down('md')]: { width: "49%" } }}

								onClick={() => {
									handleCloseTeste();
								}}
							>
								Cancelar
							</ButtonStyle>
						</Box>

						
					</FormControl>


















				</BoxStyle>
			</Modal>
		</>






	);
}

export default Produtosedit;