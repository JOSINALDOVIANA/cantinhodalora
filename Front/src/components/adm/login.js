import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Avatar, Button, TextField } from '@mui/material';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navegator=useNavigate();
  const [values,setValues]=React.useState({email:'',password:''});
  // console.log(values)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ height: '100vh', display: "flex", justifyContent: "center", alignItems: "center" }} >
          <Box sx={{ border:"2px solid #dddddd",borderRadius:"3px",boxShadow:" 1px 1px 1px 1px  ", height: "500px", width: "500px", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
            <Avatar sx={{ width: 56, height: 56 ,marginBottom:5 }} alt='josinaldo'></Avatar>
            
          <TextField sx={{marginBottom:5}} onChange={(e)=>setValues(a=>({...a,email:e.target.value}))} type="email" label="E-mail"></TextField>
          <TextField sx={{marginBottom:5}} onChange={(e)=>setValues(a=>({...a,password:e.target.value}))} type="password" label="Senha"></TextField>
          
          <Button onClick={async()=>{
            api.post("/login",{...values}).then(r=>{
              console.log(r.data)
              if(r.data.status){ navegator("/perfil",{state:r.data.user})}
             else{ alert(r.data.mensagem)}
            })
          }} variant="contained" color="success">Entrar</Button>

          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
