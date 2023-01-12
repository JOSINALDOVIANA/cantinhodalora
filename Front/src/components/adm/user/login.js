import * as React from 'react';

import Box from '@mui/material/Box';

import  TextField  from '@mui/material/TextField';
import  Avatar  from '@mui/material/Avatar';
import  Button  from '@mui/material/Button';
import { api } from '../../../api';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navegator = useNavigate();
  const [values, setValues] = React.useState({ email: '', password: '' });
  // console.log(values)
  return (
    <React.Fragment>


      <Box
        sx={{
          height: '100vh',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000"
        }} >
        <Box
          sx={{
            // border: "2px solid #dddddd",
            borderRadius: "3px",
            boxShadow: "2px 2px 20px 2px #fff",
            height: "500px",
            width: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            background: "#FFF"            
          }}
          component="form"
          noValidate
          autoComplete
          onSubmit={async (e) => {
            e.preventDefault();
            api.post("/login", { ...values }).then(r => {
              console.log(r.data)
              if (r.data.status) { navegator("/perfil", { state: r.data.user }) }
              else { alert(r.data.mensagem) }
            })
          }}
          action="#"

        >
          <Avatar sx={{ width: 56, height: 56, marginBottom: 5 }} alt='josinaldo'></Avatar>

          <TextField sx={{ marginBottom: 5 }} onChange={(e) => setValues(a => ({ ...a, email: e.target.value }))} type="email" label="E-mail"></TextField>
          <TextField label="Required" autoComplete="current-password" sx={{ marginBottom: 5 }} onChange={(e) => setValues(a => ({ ...a, password: e.target.value }))} type="password" label="Senha"></TextField>

          <Button type='submit' variant="contained" color="success">Entrar</Button>

        </Box>
      </Box>

    </React.Fragment>
  );
}
