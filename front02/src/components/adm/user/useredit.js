import * as React from 'react';

import { Avatar, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { DadosContext } from '../../../routs';
// import { api } from '../../../api';
import './styleInput.css'





export default function BasicTable() {
  const navegar = useNavigate();
  const theme = useTheme();
  const [Dados,setDados] = React.useContext(DadosContext)

  React.useEffect(() => {
    if (Object.keys(Dados).length>0) { return }
    navegar("/")
  }, [Dados])

  return (
    <Box sx={{position:"relative",  display: "flex", [theme.breakpoints.down("md")]:{flexDirection:"column",position:"absolute"}, justifyContent: "center", alignItems: "center",bgcolor:"background.paper" }}>
      {/* <TableContainer component={Box} sx={{ width: "100%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Senha</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{Dados?.user?.id}</TableCell>
              <TableCell align="center">
                <input
                  style={{ border: 0, textAlign: "center", textDecoration: "none", outline: "none", background: "transparent", color: theme.palette.mode == "dark" ? "#fff" : "#000" }}
                  value={Dados?.user?.name}
                  onChange={e => setDados(a => ({ ...a, user: { ...a.user, name: e.target.value } }))}
                  placeholder={Dados?.user?.name} />
              </TableCell>
              <TableCell align="center">
                <input
                  style={{ border: 0, textAlign: "center", textDecoration: "none", outline: "none", background: "transparent", color: theme.palette.mode == "dark" ? "#fff" : "#000" }}
                  value={Dados?.user?.email}
                  onChange={e => setDados(a => ({ ...a, user: { ...a.user, email: e.target.value } }))}
                  placeholder={Dados?.user?.email} />
              </TableCell>
              <TableCell align="center">
                <input
                  style={{ border: 0, textAlign: "center", textDecoration: "none", outline: "none", background: "transparent", color: theme.palette.mode == "dark" ? "#fff" : "#000" }}
                  value={Dados?.user?.password}
                  onChange={e => setDados(a => ({ ...a, user: { ...a.user, password: e.target.value } }))}
                  placeholder={Dados?.user?.password} />
              </TableCell>
              <TableCell align="center">
                <Button
                  sx={{ "&": { marginRight: theme.spacing(1) } }}
                  variant='contained'
                  color='success'
                  onClick={() => {
                    api.put("/update", { ...Dados.user }).then(r => {
                      alert(r.data.mensagem)
                      navegar('/perfil')
                    })
                  }}
                  >
                  Salvar
                </Button>
                <Button
                  variant='contained'
                  color='error'
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}
      <Avatar className='field' sx={{width:100,height:100,position:"absolute",left:5,top:5}} alt='perfilimage' src={Dados?.user?.img?.url}></Avatar>
    </Box>
  );
}