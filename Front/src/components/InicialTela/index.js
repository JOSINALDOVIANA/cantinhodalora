import React, { useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import MenuAppBar from '../AppBar/index';



import { Outlet } from 'react-router-dom';

function InicialTela() {
  
  return (




    <Container maxWidth="lg" sx={{
      backgroundColor: "#fff",
      color: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      flexGrow: 1,
      


    }}>
      <CssBaseline />
      <MenuAppBar></MenuAppBar>
      <Outlet></Outlet>
    </Container>


  );
}

export default InicialTela;