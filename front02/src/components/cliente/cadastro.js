import React from 'react';
import dayjs from 'dayjs';
import locale_pt from 'dayjs/locale/pt-br'
import { Box, Button, Chip, CssBaseline, Divider, FormControl, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, styled, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MenuAppBar from '../AppBar';

// import { Container } from './styles';
const TextFieldStyled = styled(TextField)(({ theme }) => ({

  '&&': {
    marginBottom: theme.spacing(2)
  }
}))

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});
function Cadastro() {
  dayjs.locale(locale_pt)
  const [dados, setDados] = React.useState({})
  const [showPassword, setshowPassword] = React.useState(false);
  const theme = useTheme();

  return (

    <>
      <CssBaseline />
      <MenuAppBar></MenuAppBar>
      <Box component={"form"} sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",      
        padding: theme.spacing(2),
              
        overflow:"scroll",       

      }} onSubmit={e => {
        e.preventDefault()
        console.log()
      }}

      >


        <Box
          component={Paper}
          elevation={3}
          sx={{
            display: "flex",
            maxHeight:"70vh",
            flexDirection: "row",
            overflow:"scroll",
            [theme.breakpoints.down("md")]: { flexDirection: "column" },
            // boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            // boxShadow: "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset"
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"


          }}
        >

          <Box sx={{ padding: 2, display: "flex", flexDirection: "column", [theme.breakpoints.up("md")]: { mr: theme.spacing(2) } }}>
            <Divider sx={{ mb: 2 }}>
              <Chip label="Dados pessoais"></Chip>
            </Divider>
            <TextFieldStyled name='name' label="Nome" />
            <TextFieldStyled name='cpf' label="CPF" />
            <TextFieldStyled name='telefone' label="Telefone" />
            <TextFieldStyled type='date' defaultValue={dayjs(new Date()).format("YYYY-MM-DD")} name='nascimento' label="D. Nascimen." />
          </Box>

          <Box sx={{ padding: 2, display: "flex", flexDirection: "column", [theme.breakpoints.up("md")]: { mr: theme.spacing(2) } }}>
            <Divider sx={{ mb: 2 }} >
              <Chip label="Dados de Acesso"></Chip>
            </Divider>
            <TextFieldStyled name='email' label="E-mail" type='text' placeholder={dados?.email} />
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id='password'
              label="Senha"
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder={dados?.password}
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

          <Box sx={{ padding: 2, display: "flex", flexDirection: "column", [theme.breakpoints.up("md")]: { mr: theme.spacing(2) } }}>
            <Divider sx={{ mb: 2 }} >
              <Chip label="Localização"></Chip>
            </Divider>
            <TextFieldStyled name='cidade' label="Endereço" type='text' placeholder={dados?.cidade} />
            <TextFieldStyled name='bairro' label="Bairro" type='text' placeholder={dados?.bairro} />
            <TextFieldStyled name='endereco' label="Endereço" type='text' placeholder={dados?.endereco} />
            
            
          </Box>          

          <Box  sx={{ padding: 2, display: "flex", flexDirection: "column", [theme.breakpoints.up("md")]: { mr: theme.spacing(2) } }} component={FormControl}>
            <Divider sx={{mb:2}}>
              <Chip label="Formas de Pagamento"></Chip>
            </Divider>

            <FormLabel>N° Cartão</FormLabel>
            <TextField
              type='number'
              placeholder={dados?.ncart}
              name='ncart'
             
            />
           




            <FormLabel sx={{ mt: 2 }}>Validade</FormLabel>
            <CssTextField
            name='validadecart'
              helperText={"será valido apenas o mês e ano!"}
              type='date'
              defaultValue={dayjs(dados?.validadecart).format("YYYY-MM-DD")}
              
            />


            <FormLabel sx={{ mt: 2 }}>CVC</FormLabel>
            <TextField
            name='cvc'
              type='text'
             placeholder={dados?.cvc}
              
            />

<Button sx={{my:3}} variant='contained' type='submit' color='success'>Salvar</Button>
          </Box>
         

        </Box>


      </Box>
    </>

  )
}

export default Cadastro;