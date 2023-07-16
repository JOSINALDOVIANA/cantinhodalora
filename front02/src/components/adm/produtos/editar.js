import { Avatar, Box, Button, Divider, FormControl, Grid, ImageList, ImageListItem, Modal, Paper, TextField, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { api, url } from "../../../api";
import { uniqueId } from "lodash";


import "./styleeditar.css";
import Swal from "sweetalert2";


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


	return (
		<Paper className='p-1'>
			<Grid container alignItems="center" spacing={2}>
				{produtos?.map((p, index) => (
					<Grid key={p.id + "prod" + uniqueId()} item xs={6} sm={4} md={3} lg={3}>
						<Paper

							elevation={4}
							sx={{
								display: "flex",
								borderRadius: 1,
								flexDirection: "column",
								fontFamily: "Roboto",
								alignItems: "center",
								justifyContent: "center",
								padding: 1,
								overflow: "hidden"


							}}
							className='card'
							onClick={() => {
								setSelectP({ id: p.id, index, prod: p }); handleOpenTeste();
							}}

						>





							<Img

								alt={p.desc}
								src={!!p.img ? url + "images/" + p.img.key : ""}
								sx={{ borderRadius: 0, width: 100, height: 100, margin: 2 }} />



							<Typography sx={{ color: "#404E5C", fontSize: "0.9em", width: "90%" }} noWrap variant="subtitle1" component="p">
								{p.desc + " " + p.tam}
							</Typography>







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
				<BoxStyle sx={{ height: "90vh", width: "80vw" }} >



					<Grid container alignItems="center" spacing={1} >
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
								<Img



									src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
									alt={item.name}

									onClick={() => {
										setSelectP(a => ({ ...a, prod: { ...a.prod, img: item, id_image: item.id } }));
										handleClose();
									}}
									loading="lazy"
								/>
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
				<BoxStyle sx={{height:"90vh",width:"90%"}}>


					<Grid container alignItems="center" spacing={1}  >
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
									src={item.url+"?w=164&h=164&fit=crop&auto=format"}
									
									onClick={() => {
										setSelectP(a => ({ ...a, prod: { ...a.prod, logos: [...a.prod.logos, item] } }));
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
				<BoxStyle sx={{width:"90vw",height:"auto"}}>

					<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
						<Typography>
							Cadastradas
						</Typography>
						<Box sx={{}}>
						{
							selectprod?.prod?.cat?.map(cat => (
								<Button
								sx={{"&":{margin:1}}}
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
							<Button sx={{margin:1}} variant="contained" color="error" key={cat.id + uniqueId()} onClick={() => {
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
					alignItems: "center",
					justifyContent: "center",
					padding: theme.spacing(1),
					width: "90vw",
					height: "90vh"

				}}

				>



					<Img
						onClick={() => { handleOpen(); }}
						alt={selectprod.prod.desc}
						src={url + "images/" + selectprod?.prod?.img?.key}
						sx={{ borderRadius: 0, width: "auto", height: "12vh", }} />
					<Paper
						elevation={12}
						onClick={() => {
							handleOpenL(selectprod?.prod?.logos);
						}}

						sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", marginBottom: 1, height: "auto", width: "50%", padding: "2px" }}>
						{selectprod?.prod?.logos?.map(item => (
							<Avatar
								// onClick={()=>{
								// 	setSelectP(a=>({...a,prod:{...a.prod,logos:a.prod.logos.filter(i=>(i.id!=item.id))}}))
								// }} 
								key={item.id + uniqueId()}
								sx={{ width: "auto", height: "5vh" }}
								src={item.url}
								alt={item.desc}
							>
							</Avatar>))}
					</Paper>


					<Typography sx={{ fontFamily: "Roboto" }} noWrap variant="subtitle1" component="p">
						{selectprod.prod.desc + " " + selectprod.prod.tam}
					</Typography>





					<Divider color="#000" sx={{ width: "90%" }} ></Divider>

					{/* entradas de texto */}

					<Box
						sx={{ display: "flex", marginTop: theme.spacing(2), alignItems: "center", justifyContent: "center", flexDirection: "column", width: "90%" }}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
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

					<Box sx={{ display: "flex", width: "70vw", [theme.breakpoints.up("sm")]: { width: "20vw" }, height: "20vh", justifyContent: "space-around", alignItems: "center" }}>
						<FormControl >
							<ButtonStyle
								variant='contained'
								color='success'
								onClick={(e) => {
									e.preventDefault();

									api.put("/produtos", { ...selectprod.prod, cat: selectprod.prod.cat.map(c => (c.id)), logos: selectprod.prod.logos.map(l => (`${l.id}`)) }).then(r => {
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

								onClick={() => {
									handleOpenC();
								}}
							>
								Categorias
							</ButtonStyle>

						</FormControl>
						<FormControl>
							<ButtonStyle
								variant='contained'
								color='error'

								onClick={() => {
									api.delete(`/produtos?id=${selectprod.prod.id}`).then(r => {
										if (r.data.status) {
											let pr = produtos.filter(item => item.id != selectprod.prod.id);

											setProd(pr);

											handleCloseTeste();
										}
									});
								}}

							>
								Excluir
							</ButtonStyle>
							<ButtonStyle
								variant='contained'
								color='warning'

								onClick={() => {
									handleCloseTeste();
								}}
							>
								Cancelar
							</ButtonStyle>
						</FormControl>
					</Box>
















				</BoxStyle>
			</Modal>

		</Paper>
	);
}

export default Produtosedit;