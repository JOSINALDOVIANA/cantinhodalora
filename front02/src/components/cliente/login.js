import React, { useContext } from 'react';
import { Box, Button, Dialog, DialogTitle, FormControl, Paper, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { DadosContext } from '../../routs';
import { api } from '../../api';



function LoginCli(props) {
    const [setDados]=useContext(DadosContext);
    // const theme=useTheme()
  return (
<Dialog sx={{borderRadius:"5px"}}  {...props}>
						<DialogTitle sx={{ 
                            textAlign: "center", 
                            padding: 4,
                            fontFamily:"Roboto"
                            // backgroundColor:"#f1faee",
                            // color:theme.palette.getContrastText("#f1faee")
                            }}>
							LOGIN
						</DialogTitle>
						<Paper
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "auto",
								height: "50vh",
                                
							}}
							onSubmit={async (e) => {
								e.preventDefault()
								api.post("clientes/login", { email: e.target["email"].value, password: e.target["password"].value }).then(r => {
									if (!r.data.status) {

										props.onClose();
										Swal.fire(
											"erro ao logar",
											`<Typography component={"span"}>Tente Novamente, se persistir contacte o ADM do estabelecimento ou tente o "esqueci a senha"</Typography>`,
											"error"
										)
									} else {

										setDados(a => ({ ...a, user: { ...r.data.user,cli:true } }));
										props.onClose();
										Swal.fire(
											"Login realizado com sucesso",
											`<Typography component={"span"}>Por favor sinta-se a vontade!!</Typography>`,
											"success"
										)
									}

								})

							}}
							component={"form"}>

							<FormControl sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%", margin: 2 }}>
								<TextField name="email" label="E-mail" type="text"></TextField>
								<TextField name="password" label="Senha" type="password"></TextField>
								<Box component={"div"} sx={{ display: "flex", width: "90%", justifyContent: "space-around" }}>
									<Typography href="/recuperar" sx={{ textDecoration: "none", cursor: "pointer", margin: 2 }} component={"a"}>Esqueci a senha</Typography>
									<Typography href="/cadastro/cliente" sx={{ textDecoration: "none", cursor: "pointer", margin: 2 }} component={"a"}>Cadastrar</Typography>
								</Box>
								<Box component={"div"} sx={{ display: "flex", width: "100%", justifyContent: "space-around" }}>

									<Button sx={{ "& ": { marginRight: 2 } }} type="submit" variant="contained" color="success">Entrar</Button>
									<Button type="button" onClick={() => { props.onClose() }} variant="contained" color="error">Cancelar</Button>
								</Box>
							</FormControl>

						</Paper>

					</Dialog>
  );
}

export default LoginCli;