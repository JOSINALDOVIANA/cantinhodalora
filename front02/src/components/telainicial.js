import { Box, Container, CssBaseline, useTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import { TrocarTheme } from '../routs';
import MenuAppBar from './AppBar';
import { dark } from '@mui/material/styles/createPalette';
import { Outlet } from 'react-router-dom';

// import { Container } from './styles';

function TelaInicial() {
  const theme = useTheme()

  return (

    <React.Fragment>
      <CssBaseline />
        <MenuAppBar></MenuAppBar>
      <Container maxWidth="xl">
       <Outlet></Outlet>
      </Container>
    </React.Fragment>
    // <Container maxWidth="xl"   sx={{
    //   background:theme.palette.mode=="dark"?"#fff":"#000",
    //   color:theme.palette.mode=="dark"?"#000":"#fff",
    //   margin:0,
    //   // padding:theme.spacing(2),



    //   }}>
    //     <MenuAppBar></MenuAppBar>

    //   <TrocarTheme></TrocarTheme>
    // </Container>
  );
}

export default TelaInicial;