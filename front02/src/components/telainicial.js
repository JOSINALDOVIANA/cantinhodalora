import {  Container, CssBaseline, Typography, useTheme } from '@mui/material';

import React from 'react';

import MenuAppBar from './AppBar';

import { Outlet } from 'react-router-dom';


// import { Container } from './styles';

function TelaInicial() {
  const theme = useTheme()



  return (

    <React.Fragment>
      <CssBaseline />
      <MenuAppBar></MenuAppBar>
      {/* <Typography
					sx={{display:"none",fontFamily:"Lunasima",fontSize:"2rem",textAlign:"center",[theme.breakpoints.down("md")]:{display:"flex",textAlign:"center",justifyContent:"center",alignItems:"center"}}}
					>CANTINHO DA LORA</Typography> */}
      <Container maxWidth={false} sx={{ margin: 0, padding: 1, paddingBottom: theme.spacing(10),marginTop:theme.spacing(10) }} >
        <Outlet></Outlet>
      </Container>
      

    </React.Fragment>

  );
}

export default TelaInicial;