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
      <Box  sx={{ display: "flex",flexDirection:"row", padding: 2, [theme.breakpoints.down("md")]: { flexDirection: "column", alignItems: "center" } }}>

        <Box sx={{ [theme.breakpoints.down("md")]: { mt: 2 }, ml: 2 }}>
          <Avatar sx={{ boxShadow: "inset 2px 5px 10px rgb(5, 5, 5)", width: 120, height: 120 }} src={Dados?.user?.img?.url} alt='image perfil'></Avatar>
        </Box>

        <Paper  elevation={1}  sx={{ [theme.breakpoints.down("md")]: { mt: 2, ml: 0 }, ml: 5, mt: 7,padding:2 }} component={FormControl}>
          <Divider>
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


        </Paper>

        <Paper elevation={3} sx={{ [theme.breakpoints.down("md")]: { mt: 2, ml: 0 }, ml: 5, mt: 7,padding:2 }} component={FormControl}>

          <Divider>
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

        </Paper>

        <Paper elevation={6} sx={{ [theme.breakpoints.down("md")]: { mt: 2, ml: 0 }, ml: 5, mt: 7,padding:2 }} component={FormControl}>
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

        </Paper>

        <Paper elevation={9} sx={{ [theme.breakpoints.down("md")]: { mt: 2, ml: 0 }, ml: 5, mt: 7,padding:2 }} component={FormControl}>
          <Divider>
            <Chip label="Meios de pagamento"></Chip>
          </Divider>

          <FormLabel>N° Cartão</FormLabel>
          <TextField
            type='text'
            value={Dados?.user?.ncart}
            onChange={e => {
              e.preventDefault();
              setDados(a => ({ ...a, user: { ...a.user, ncart: e.target.value } }))
            }}
          />
          <FormLabel sx={{mt:2}}>N° CVC</FormLabel>
          <TextField
            type='text'
            value={Dados?.user?.cvc}
            onChange={e => {
              e.preventDefault();
              setDados(a => ({ ...a, user: { ...a.user, cvc: e.target.value } }))
            }}
          />
          <FormLabel sx={{mt:2}}>Val. Cartão</FormLabel>
          <TextField
            type='text'
            value={Dados?.user?.validadecart}
            onChange={e => {
              e.preventDefault();
              setDados(a => ({ ...a, user: { ...a.user, validadecart: e.target.value } }))
            }}
          />
        </Paper>

      </Box>
      
        <FormControl sx={{[theme.breakpoints.down("md")]:{flexDirection:"column"},display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}  >
        <Button sx={{mt:2}} variant='contained' color="warning">Alterar Foto</Button>
        <Button sx={{mt:2}} variant='contained' color='success'>Atualizar Dados</Button>
        <Button sx={{mt:2,[theme.breakpoints.down("md")]:{mb:2}}} variant='contained' color='error'>Excluir Conta</Button>
        </FormControl>
      
    </>
  );
}
export default TelaCliente;