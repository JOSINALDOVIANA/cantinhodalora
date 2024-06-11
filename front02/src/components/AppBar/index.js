import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { BsFacebook, BsInstagram, BsWhatsapp, BsArrowDownLeftSquare, BsBoxArrowInLeft } from "react-icons/bs";
import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { Avatar, InputBase, Typography, alpha, styled, useTheme } from "@mui/material";
import { ColorModeContext, DadosContext, SearchContex, TrocarTheme } from "../../routs";
import { Cancel, People, Settings } from "@mui/icons-material";
import { Brightness6, Brightness7 } from '@mui/icons-material';
import LoginCli from "../cliente/login";

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
	// const { name } = useParams()
	// const query = useQuery();
	const rota=useLocation()
	const colorMode=useContext(ColorModeContext)


	const [search,setSearch] = useContext(SearchContex);
	const [openDialog, setDialog] = useState(false);

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



	// console.log(rota)

	return (
		<Box flexGrow>

			<AppBar
				elevation={0}
				// flexGrow 
				position="static"
				sx={{
					background: "transparent",
					color: theme.palette.mode === "light" ? "#000" : null,
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
					>{!!Dados.user?Dados.user.name:"CANTINHO DA LORA"}</Typography> */}

					<Box sx={{ display: "flex", width: "auto", alignItems: "center", justifyContent: "space-around" }} component={"div"}>
						{rota.pathname==="/" && <Search  >
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>

							<StyledInputBase
								placeholder="Pesquisar…"
								inputProps={{ 'aria-label': 'Pesquisar...' }}
								onChange={e => setSearch(e.target.value)}
							/>
						</Search>}

						{
							!!Dados.user ? <Avatar sx={{margin:1}} src={Dados?.user?.img?.url} alt="imageperfil"></Avatar> : ""
						}

						{!Dados.user ?
							<People onClick={() => {
								setDialog(true)
							}}
								sx={{ margin: 1 }}

							>

							</People> :
							<Box sx={{ [theme.breakpoints.down("md")]: { display: "none" }, display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>


								<Cancel
									onClick={() => {
										let d = delete Dados.user;
										setDados(d);
										navegador("/")
									}}
									sx={{ cursor: "pointer", margin: 1 }}
									color="error">

								</Cancel>

								<Settings onClick={() => {
									navegador(`${!!Dados.user.cli?"/cliente":"/perfil/userEdit"}`, { state: { ...Dados.user } })
								}} sx={{ cursor: "pointer",margin:1 }}></Settings>

							</Box>

						}


						<TrocarTheme sx={{ [theme.breakpoints.down("md")]: { display: "none" } }}></TrocarTheme>
					</Box>




					<Menu


						id="menu-appbar"
						anchorEl={anchorE2}
						anchorOrigin={{
							vertical: "bottom",
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
						<MenuItem sx={{ display: "flex", justifyContent: "flex-start", width: "auto" }} onClick={() => {navegador("/") ; handleClose2(); }}><IoHome style={{ marginRight: theme.spacing(2) }} color="var(--primary)"></IoHome>Pagina inicial</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "flex-start", width: "auto" }} onClick={() => { window.open("http://www.instagran.com/cantinho_dalora"); handleClose2(); }}><BsInstagram style={{ marginRight: theme.spacing(2) }} color="var(--primary-telegran)"></BsInstagram>Instagran</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "flex-start", width: "auto" }} onClick={() => { window.open("https://www.facebook.com/cantinhodalora"); handleClose2(); }}><BsFacebook style={{ marginRight: theme.spacing(2) }} color="var(--primary-facebook)"></BsFacebook>Facebook</MenuItem>
						<MenuItem sx={{ display: "flex", justifyContent: "flex-start", width: "auto" }} onClick={() => { window.open("https://api.whatsapp.com/send?phone=+5596981325410&text=Oi"); handleClose2(); }}><BsWhatsapp style={{ marginRight: theme.spacing(2) }} color="var(--primary-whatsapp)"></BsWhatsapp>Whatsaap</MenuItem>

						{!!Dados.user?null:
						<MenuItem sx={{ display: "flex", justifyContent: "flex-start", width: "auto" }} onClick={() => { navegador("/login");handleClose2() }}><BsArrowDownLeftSquare style={{ marginRight: theme.spacing(2) }} color="var(--configDanger)"></BsArrowDownLeftSquare>Área administrativa</MenuItem>
					}
						
						{!!Dados.user ?
							<MenuItem
								onClick={() => {
									navegador(`${!!Dados.user.adm?"/perfil/userEdit":"/cliente"}`, { state: { ...Dados.user } })
								}}
								sx={{
									[theme.breakpoints.up("md")]: { display: "none" },
									display: "flex",
									justifyContent: "flex-start",
									width: "auto",

								}}>



								<IoSettingsOutline color="var(--primary)" size={20} style={{ marginRight: theme.spacing(2) }} ></IoSettingsOutline>
								Perfil
							</MenuItem> : null
						}
						{!!Dados.user ?
							<MenuItem
								onClick={() => {
									let d = delete Dados.user;
									setDados(d)
									navegador("/")
								}}
								sx={{
									[theme.breakpoints.up("md")]: { display: "none" },
									display: "flex",
									justifyContent: "flex-start",
									width: "auto",

								}}>
								<BsBoxArrowInLeft
									style={{ marginRight: theme.spacing(2) }}
									size={20}
									color="#e02141"


								/>


								Sair
							</MenuItem> : null
						}

						<MenuItem onClick={colorMode.toggleColorMode} sx={{ [theme.breakpoints.up("md")]: { display: "none" }, display: "flex", justifyContent: "flex-start", width: "auto" }}>{theme.palette.mode === 'dark' ? <Brightness6 sx={{mr:2}} /> : <Brightness7 sx={{mr:2}}/>}Trocar Tema</MenuItem>


					</Menu>

					<LoginCli onClose={() => { setDialog(false) }} open={openDialog}/>




				</Toolbar>


			</AppBar>
		</Box>
	);
}
