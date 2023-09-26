import * as React from 'react';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { DadosContext } from '../../routs';
import MenuAppBar from '../AppBar';
import { Chip, CssBaseline, Divider, FormControl, FormLabel, InputAdornment, OutlinedInput, Paper, TextField, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { api } from '../../api';

const pages = ['Meus Dados'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function TelaCliente() {



  const [Dados, setDados] = React.useContext(DadosContext);
  const [showPassword, setshowPassword] = React.useState(false);
  const theme = useTheme();
  console.log(Dados)

  return (
    <>
      <CssBaseline />
      <MenuAppBar></MenuAppBar>
      <Box sx={{ display: "flex", padding: 2, [theme.breakpoints.down("md")]: { flexDirection: "column", alignItems: "center" } }}>

        <Box sx={{ [theme.breakpoints.down("md")]: { mt: 2 }, ml: 2 }}>
          <Avatar sx={{ boxShadow: "inset 2px 5px 10px rgb(5, 5, 5)", width: 120, height: 120 }} src={Dados?.user?.img?.url} alt='image perfil'></Avatar>
        </Box>

        <Paper elevation={1} sx={{ [theme.breakpoints.down("md")]: { mt: 2, ml: 0, flexDirection: "column" }, ml: 5, mt: 7, padding: 2, display: "flex", flexDirection: "row" }} >

          <Box sx={{margin:2,[theme.breakpoints.down("md")]:{}}} component={FormControl}>
            <Divider >
              <Chip label="Dados de Acesso"></Chip>
            </Divider>
            <FormLabel>Nome</FormLabel>
            <TextField type='text' value={Dados?.user?.name} onChange={e => {
              e.preventDefault();
              setDados(a => ({ ...a, user: { ...a.user, name: e.target.value } }))
            }} />

            <FormLabel sx={{ mt: 2 }}>E-mail</FormLabel>
            <TextField type='text' value={Dados?.user?.email} onChange={e => {
              e.preventDefault();
              setDados(a => ({ ...a, user: { ...a.user, email: e.target.value } }))
            }} />
            <FormLabel sx={{ mt: 2 }} >Senha</FormLabel>
            <OutlinedInput

              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, password: e.target.value } }))
              }}
              type={showPassword ? 'text' : 'password'}
              value={Dados?.user?.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setshowPassword(a => !a)}
                    onMouseDown={(e) => { e.preventDefault() }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }

            />
          </Box>

          <Box sx={{margin:2,[theme.breakpoints.down("md")]:{}}} component={FormControl}>
            <Divider >
              <Chip label="Localização"></Chip>
            </Divider>
            <FormLabel>Cidade</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.cidade}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, cidade: e.target.value } }))
              }}
            />
            <FormLabel sx={{ mt: 2 }}>Bairro</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.bairro}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, bairro: e.target.value } }))
              }}
            />
            <FormLabel sx={{ mt: 2 }}>Endereço</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.endereco}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, endereco: e.target.value } }))
              }}
            />
          </Box>

          <Box sx={{margin:2,[theme.breakpoints.down("md")]:{}}} component={FormControl}>
            <Divider>
              <Chip label="Dados Pessoais"></Chip>
            </Divider>

            <FormLabel>CPF</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.cpf}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, cpf: e.target.value } }))
              }}
            />
            <FormLabel sx={{ mt: 2 }}>Nascimento</FormLabel>
            <TextField
              type='text'
              value={new Date(Dados?.user?.nasciento).toDateString()}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, nascimento: e.target.value } }))
              }}
            />
            <FormLabel sx={{ mt: 2 }}>Telefone</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.telefone}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, telefone: e.target.value } }))
              }}
            />
          </Box>

          <Box component={FormControl}>
          <Button sx={{ mt: 2 }} variant='contained' color="warning">Alterar Foto</Button>
          <Button onClick={async ()=>{
           await api.put("/clientes/update",{...Dados.user}).then(r=>{
              r.data.status?alert("Dados atualçizados"):alert("Não foi possivel atualizar seus dados entre em contatos com o administrador")
            })
          }} sx={{ mt: 2 }} variant='contained' color='success'>Atualizar Dados</Button>
          <Button sx={{ mt: 2, [theme.breakpoints.down("md")]: { mb: 2 } }} variant='contained' color='error'>Excluir Conta</Button>
          </Box>


        </Paper>





      </Box>



    </>
  );
}
export default TelaCliente;