import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { BsFacebook, BsInstagram, BsWhatsapp, BsArrowDownLeftSquare } from "react-icons/bs";
import {  Avatar, Button, Dialog, DialogTitle, FormControl, InputBase, Paper, TextField, Typography, alpha, styled, useTheme } from "@mui/material";
import { DadosContext, SearchContex, TrocarTheme } from "../../routs";
import { useQuery } from "../../functions/searchquery";
import { Cancel, People, Settings } from "@mui/icons-material";
import { api } from "../../api";
import Swal from "sweetalert2";

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));
export default function MenuAppBar(prop) {
	const {name}=useParams()
	const query = useQuery();
	

	const [search, setSearch] = useContext(SearchContex);
	const [openDialog, setDialog] =useState(false);
	
	const [Dados, setDados] = useContext(DadosContext);
	

	const navegador = useNavigate();
	const theme = useTheme()

	
	const [anchorE2, setAnchorE2] = React.useState(null);
	const handleMenu2 = (event) => {		
		setAnchorE2(event.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorE2(null);
	};
	

	
console.log(Dados)

	return (
		<Box flexGrow>

			<AppBar 
			elevation={0}
			// flexGrow 
			position="static" 
			sx={{
				background: "transparent",
				color: theme.palette.mode == "light" ? "#000" : null,
				// boxShadow:`0px 0px 10px 0 #ffa726`,
				verticalAlign: "center",
			}}
			>
				<Toolbar sx={{
					display: "flex",
					justifyContent: "space-between"
				}}>
					<IconButton
						size="large"
						edge="start"
						aria-label="menu"
						onClick={handleMenu2}
					>
						<MenuIcon />
					</IconButton>

					{/* <Typography
					sx={{fontFamily:"Lunasima",fontSize:"2rem",[theme.breakpoints.down("md")]:{display:"none"}}}
					>CANTINHO DA LORA</Typography> */}

					<Box sx={{ display: "flex",width:"auto", alignItems:"center",justifyContent:"space-around" }} component={"div"}>
						<Search  >
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>

							<StyledInputBase
								placeholder="Pesquisar…"
								inputProps={{ 'aria-label': 'Pesquisar...' }}
								onChange={e => setSearch(e.target.value)}
							/>
						</Search>
						<Box component={"div"} sx={{backgroundImage:`url(${Dados?.user?.img?.url})`,display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "30px", maxWidth: "30px", objectFit: "cover"}}></Box>

						{!Dados.user?
						<People onClick={()=>{
							setDialog(true)
						}}  
						 sx={{ml:1}}
						
						>
							
						</People>:
						<Box sx={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%"}}>

							
							<Cancel
							onClick={()=>{
								let d=delete Dados.user;
								setDados(d)
							}}
							 sx={{cursor:"pointer",margin:1}} 
							 color="error">

							 </Cancel>

							 <Settings onClick={()=>{
								navegador("/cliente",{state:{...Dados.user}})
							 }} sx={{cursor:"pointer"}}></Settings>

						</Box>

						}


						<TrocarTheme></TrocarTheme>
					</Box>




					<Menu
					
						
						id="menu-appbar"
						anchorEl={anchorE2}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorE2)}
						onClose={handleClose2}
					

					>
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("http://www.instagran.com/cantinho_dalora"); handleClose2(); }}><BsInstagram color="#405DE6"></BsInstagram>Instagran</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("https://www.facebook.com/cantinhodalora"); handleClose2(); }}><BsFacebook color="#4267B2"></BsFacebook>Facebook</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("https://api.whatsapp.com/send?phone=+5596981325410&text=Oi"); handleClose2(); }}><BsWhatsapp color="#25D366"></BsWhatsapp>Proprietário</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "200px" }} onClick={() => {navegador("/login") }}><BsArrowDownLeftSquare color="#e02141"></BsArrowDownLeftSquare>Área administrativa</MenuItem>



					</Menu>

					<Dialog onClose={()=>{setDialog(false)}} open={openDialog}>
						<DialogTitle sx={{textAlign:"center",padding:4,bgcolor:"background.paper"}}>
							LOGIN
						</DialogTitle>
						<Paper 
						sx={{
							display:"flex",
							justifyContent:"center",
							alignItems:"center",
							width:"auto",
							height:"50vh"
						}} 
						onSubmit={async(e)=>{
							e.preventDefault()
							api.post("clientes/login",{email:e.target["email"].value,password:e.target["password"].value}).then(r=>{
								if(!r.data.status){
									
									setDialog(false);
									Swal.fire(
										"erro ao logar",
										`<Typography component={"span"}>Tente Novamente, se persistir contacte o ADM do estabelecimento ou tente o "esqueci a senha"</Typography>`,
										"error"
										)
								}else{
									
									setDados(a=>({...a,user:{...r.data.user}}));
									setDialog(false);
									Swal.fire(
										"Login realizado com sucesso",
										`<Typography component={"span"}>Por favor sinta-se a vontade!!</Typography>`,
										"success"
										)
								}

							})
							
						}}  
						component={"form"}>

							<FormControl sx={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",height:"100%",margin:2}}>
								<TextField  name="email" label="E-mail" type="text"></TextField>
								<TextField  name="password" label="Senha" type="password"></TextField>
								<Box component={"div"} sx={{display:"flex",width:"90%",justifyContent:"space-around"}}>
								<Typography href="/recuperar" sx={{textDecoration:"none",cursor:"pointer",margin:2}} component={"a"}>Esqueci a senha</Typography>
								<Typography href="/cadastro" sx={{textDecoration:"none",cursor:"pointer",margin:2}} component={"a"}>Cadastrar</Typography>
								</Box>
								<Box component={"div"} sx={{display:"flex",width:"90%",justifyContent:"space-around"}}>

								<Button sx={{"& ":{marginRight:2}}} type="submit" variant="contained" color="success">Entrar</Button>
								<Button type="button" onClick={()=>{setDialog(false)}} variant="contained" color="error">Cancelar</Button>
								</Box>
							</FormControl>

						</Paper>
						
					</Dialog>




				</Toolbar>


			</AppBar>
		</Box>
	);
}
