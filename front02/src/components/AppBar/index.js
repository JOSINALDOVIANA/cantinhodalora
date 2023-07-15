import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { BsFacebook, BsInstagram, BsWhatsapp, BsArrowDownLeftSquare } from "react-icons/bs";
import {  InputBase, alpha, styled, useTheme } from "@mui/material";
import { SearchContex, TrocarTheme } from "../../routs";

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

	const [search, setSearch] = useContext(SearchContex);

	const navegator = useNavigate();
	const theme = useTheme()
	const [anchorE2, setAnchorE2] = React.useState(null);
	const handleMenu2 = (event) => {		
		setAnchorE2(event.currentTarget);
	};



	const handleClose2 = () => {
		setAnchorE2(null);
	};

	return (
		<Box flexGrow>

			<AppBar 
			// flexGrow 
			position="static" 
			sx={{
				background: "transparent",
				color: theme.palette.mode == "light" ? "#000" : null,
				boxShadow:`0px 0px 10px 0 ${theme.palette.mode=="dark"?"#fff":"#000"}`,
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

					<Box sx={{ display: "flex" }} component={"div"}>
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
						<MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { navegator("/login") }}><BsArrowDownLeftSquare color="#e02141"></BsArrowDownLeftSquare>Login/Entrar</MenuItem>



					</Menu>




				</Toolbar>


			</AppBar>
		</Box>
	);
}
