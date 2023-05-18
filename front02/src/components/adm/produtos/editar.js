import { Avatar, Box, Button, Divider, Grid, ImageList, ImageListItem, Modal, Paper, TextField, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { api, url } from "../../../api";
import { uniqueId } from "lodash";


import "./styleeditar.css";
import Swal from "sweetalert2";

// import { Container } from './styles';
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
const Img = styled("img")({
	margin: "auto",
	display: "block",
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

	// console.log(selectprod);
	return (
		<Paper sx={{ }} className='p-1'>
			<Grid container alignItems="center" spacing={2}>
				{produtos?.map((p, index) => (
					<Grid key={p.id + "prod"} item xs={6} sm={4} md={3} lg={3}>


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
				<Box sx={style}>


					<ImageList sx={{ width: 500, height: 450, marginTop: 2 }} cols={3} rowHeight={164}>
						{imagens?.map((item) => (
							<ImageListItem sx={{ padding: 2 }} key={item.id + uniqueId()}>
								<img
									src={`${item?.url}?w=164&h=164&fit=crop&auto=format`}
									srcSet={`${item?.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
									alt={item?.name}
									onClick={() => {
										setSelectP(a => ({ ...a, prod: { ...a.prod, img: item, id_image: item.id } }));
										handleClose();
									}}
									loading="lazy"
								/>
							</ImageListItem>
						))}
					</ImageList>
				</Box>
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
				<Box sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					// overflow: "scroll",
					bgcolor: "background.paper",
					overflow: "scroll",
					display:"flex",
					flexDirection:"column",
					height:"100%"

				}}>

					<Paper elevation={0} component={"div"} sx={{ display: "flex", justifyContent: "space-around", height: "50px",width:"90%",marginBottom:theme.spacing(5) }}>
						{selectprod?.prod?.logos?.map((item, ind) => (
							<Img
								key={ind + item.id + item.key + "-" + uniqueId()}
								src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
								// srcSet={`${}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
								alt={item.name}
								onClick={() => {
									let log=selectprod?.prod?.logos.filter(i => i.id != item.id)
									setSelectP(a=>({...a,prod:{...a.prod,logos:[...log]}}))
								}}
								loading="lazy"
							/>
						))}
					</Paper>
					
					<Grid container alignItems="center" spacing={2} sx={{ background: "backgroud.paper", overflow: "scroll" }} >
						{imagens.map(item => (
							<Grid key={item.id + uniqueId()} item xs={6} sm={4} md={3} lg={3}>
								<Img
									alt={item.name}
									src={item.url}
									sx={{ borderRadius: 0, width: 70, height: 70}}
									onClick={() => {

										
											setSelectP(a => ({ ...a, prod: { ...a.prod, logos: [...a.prod.logos, item] } }));
										
										

									}}
								/>


							</Grid>
						))}
					</Grid>
				</Box>
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
				<Box sx={style}>

					<Box>
						<Typography>
							Cadastradas
						</Typography>
						{
							selectprod?.prod?.cat?.map(cat => (
								<Button
									key={cat.id}
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
					<Box>
						<Typography>
							Todas
						</Typography>
						{categorias.map(cat => (
							<Button key={cat.id} onClick={() => {
								setSelectP(a => ({ ...a, prod: { ...a.prod, cat: [...a.prod.cat, { ...cat }] } }));
							}}>{cat.desc}</Button>
						))}
					</Box>
				</Box>
			</Modal>
			{/* Modal editar dados*/}
			<Modal
				sx={{ overflow: "scroll" }}
				open={openTeste}
				onClose={() => {

					handleCloseTeste();
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={{
					...style, ...{
						display: "flex",
						borderRadius: 1,
						flexDirection: "column",
						fontFamily: "Roboto",
						alignItems: "center",
						justifyContent: "center",
						padding: theme.spacing(3),

						width: theme.spacing(50)
					}
				}}

				>



					<Img

						onClick={() => { handleOpen(); }}
						alt={selectprod.prod.desc}
						src={url + "images/" + selectprod?.prod?.img?.key}
						sx={{ borderRadius: 0, width: 100, height: 100, margin: 2 }} />
					<Paper
						onClick={() => {
							handleOpenL(selectprod?.prod?.logos);
						}}
						elevation={0}
						sx={{ background: "transparent", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 1, height: theme.spacing(8), width: "100%", border: " dashed 1px #000" }}>
						{selectprod?.prod?.logos?.map(item => (<Avatar key={item.id} src={item.url} alt={item.desc}></Avatar>))}
					</Paper>


					<Typography sx={{ color: "#404E5C", fontSize: "0.9em", width: "90%" }} noWrap variant="subtitle1" component="p">
						{selectprod.prod.desc + " " + selectprod.prod.tam}
					</Typography>





					<Divider color="#000" sx={{ width: "90%" }} ></Divider>

					<div
						style={{ display: "flex", marginTop: theme.spacing(5), alignItems: "center", justifyContent: "center", flexDirection: "column" }}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
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
					</div>

					<Box className="row">
						<Button
							variant='contained'
							color='success'
							className='col m-2'
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
						>Salvar</Button>
						<Button
							variant='contained'
							color='info'
							className='col m-2'
							onClick={() => {
								handleOpenC();
							}}
						>
							Categorias
						</Button>
					</Box>

					<Box className="row">
						<Button
							variant='contained'
							color='error'
							className='col m-2'


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
						</Button>
						<Button
							variant='contained'
							color='warning'
							className='col m-2'
							onClick={() => {
								handleCloseTeste();
							}}
						>
							Cancelar
						</Button>
					</Box>















				</Box>
			</Modal>

		</Paper>
	);
}

export default Produtosedit;