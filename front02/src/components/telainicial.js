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
      <Container sx={{ marginTop: theme.spacing(10), paddingBottom: theme.spacing(5) }} >
        <Outlet></Outlet>
      </Container>
    </React.Fragment>
  
  );
}

export default TelaInicial;