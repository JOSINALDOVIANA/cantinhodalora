import * as React from "react";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, FormGroup, FormLabel, Paper, Typography, useTheme } from "@mui/material";
import { DadosContext, TrocarTheme } from "../../routs";
import { CheckBox } from "@mui/icons-material";

export default function Login() {
	const navegator = useNavigate();
	const theme = useTheme()
	const [values, setValues] = React.useState({ email: "", password: "" });
	const [Dados, setDados] = React.useContext(DadosContext);
	const [cliente, setCliente] = React.useState(true);
	const [proprietário, setProp] = React.useState(false);
	console.log(cliente)

	return (
		<React.Fragment>


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
				<TrocarTheme style={{ position: "absolute", top: "10px", right: "10px" }}></TrocarTheme>
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
						// backgroundColor:theme.palette.mode=="dark"?"#fff":"#000",
						[theme.breakpoints.down("md")]: { height: "70%", width: "90%" },
						width: "50%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
						alignItems: "center",
						padding: theme.spacing(1),
						// marginTop:theme.spacing(3),
						// marginBottom:theme.spacing(3),

					}}
					component="form"
					noValidate
					autoComplete
					onSubmit={async (e) => {
						e.preventDefault();
						if (proprietário){
							api.post("/login", { ...values }).then(r => {
								// console.log(r.data);
								if (r.data.status) { setDados({ user: r.data.user }); navegator("/perfil", { state: r.data.user }); }
								else { alert(r.data.mensagem); }
							});
						}
						else{
							api.post("clientes/login", { ...values }).then(r => {
								;
								if (r.data.status) { setDados({ user: r.data.dados }); navegator("/perfil", { state: r.data.dados }); }
								else { alert(r.data.mensagem); }
							});
						}
					}}
					action="#"

				>
					<Avatar sx={{ width: 56, height: 56, [theme.breakpoints.down("md")]: { display: "none" } }} alt='Avatar'></Avatar>


					<TextField variant="outlined" id='email' label="E-mail" sx={{ width: "70%" }} onChange={(e) => setValues(a => ({ ...a, email: e.target.value }))} type="email" ></TextField>


					<TextField id="password" variant="outlined" label="Senha" sx={{ marginBottom: theme.spacing(1), width: "70%" }} onChange={(e) => setValues(a => ({ ...a, password: e.target.value }))} type="password" ></TextField>

					<FormGroup sx={{display:"flex",justifyContent:"space-evenly",width:"90%",alignItems:"center",flexDirection:"row"}}>
						<FormControlLabel control={<Checkbox  checked={cliente} onChange={()=>{setCliente(a=>!a);setProp(a=>!a)}} />} label="Cliente" />
						<FormControlLabel  control={<Checkbox checked={proprietário} onChange={()=>{setProp(a=>!a);setCliente(a=>!a)}} />} label="Proprietário" />						
					</FormGroup>


					<Button type='submit' sx={{ width: "50%", padding: theme.spacing(2), fontFamily: "Roboto", fontWeight: "bold", fontSize: "1rem" }} variant="contained" color="success">Entrar</Button>

				</Paper>
			</Paper>

		</React.Fragment>
	);
}
