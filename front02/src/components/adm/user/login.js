import * as React from "react";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { api } from "../../../api";
import { useNavigate } from "react-router-dom";
import { CssBaseline, Paper, Typography, useTheme } from "@mui/material";
import { DadosContext} from "../../../routs";
import MenuAppBar from "../appBar";

export default function Login() {
	const navegator = useNavigate();
	const theme = useTheme()
	const [values, setValues] = React.useState({ email: "", password: "" });
	const [Dados,setDados] = React.useContext(DadosContext);
	
	

	return (
		<React.Fragment>
			<CssBaseline/>
			<MenuAppBar></MenuAppBar>
			<Paper
				sx={{
					height: "100%",
					position: "relative",
					width: "100%",
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					[theme.breakpoints.down("md")]: {
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "space-evenly"
					},
					[theme.breakpoints.down("sm")]: { justifyContent: "center", alignItems: "center" },
					overflow: "scroll",
					padding: theme.spacing(1)


				}} >
				{/* <TrocarTheme style={{ position: "absolute", top: "10px", right: "10px" }}></TrocarTheme> */}
				
				<Box sx={{
					width: "20%",
					height: "100%",
					padding: theme.spacing(2),
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: [theme.palette.success],

					[theme.breakpoints.down("md")]: {
						height: "20%",
						width: "90%"
					}

				}}>
					<Typography component={"h1"} sx={{ fontWeight: "bold", width: "100%", fontSize: "3em", textAlign: "center", [theme.breakpoints.down("md")]: { fontSize: "2em" } }}>
						Faça seu login no Sistema
					</Typography>

				</Box>
				<Paper
					elevation={4}
					sx={{



						height: "60%",
						
						[theme.breakpoints.down("md")]: { height: "70%", width: "90%" },
						width: "50%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
						alignItems: "center",
						padding: theme.spacing(1),
						

					}}
					component="form"
					noValidate					
					onSubmit={async (e) => {
						e.preventDefault();
						
							api.post("/login", { ...values }).then(r => {
								
								if (r.data.status) { 
									let user=r.data.user
									let token=user.token
									delete user["token"] 
									setDados(a=>({...a,user:{...user,adm:true},token}));
									 navegator("/perfil"); 
									}
								else { alert(r.data.mensagem); }
							});
						
					
					}}
					action="#"

				>
					<Avatar sx={{ width: 56, height: 56, [theme.breakpoints.down("md")]: { display: "none" } }} alt='Avatar'></Avatar>


					<TextField variant="outlined" id='email' label="E-mail" sx={{ width: "70%" }} onChange={(e) => setValues(a => ({ ...a, email: e.target.value }))} type="email" ></TextField>


					<TextField id="password" variant="outlined" label="Senha" sx={{ marginBottom: theme.spacing(1), width: "70%" }} onChange={(e) => setValues(a => ({ ...a, password: e.target.value }))} type="password" ></TextField>

					{/* <FormGroup sx={{display:"flex",justifyContent:"space-evenly",width:"90%",alignItems:"center",flexDirection:"row"}}>
						<FormControlLabel control={<Checkbox  checked={cliente} onChange={()=>{setCliente(a=>!a);setProp(a=>!a)}} />} label="Cliente" />
						<FormControlLabel  control={<Checkbox checked={proprietário} onChange={()=>{setProp(a=>!a);setCliente(a=>!a)}} />} label="Proprietário" />						
					</FormGroup> */}


					<Button type='submit' sx={{ width: "50%", padding: theme.spacing(2), fontFamily: "Roboto", fontWeight: "bold", fontSize: "1rem" }} variant="contained" color="success">Entrar</Button>

				</Paper>
			</Paper>

		</React.Fragment>
	);
}
