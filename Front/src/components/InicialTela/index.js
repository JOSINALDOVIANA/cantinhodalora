import React, { useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import MenuAppBar from '../AppBar/index';



import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function InicialTela() {
  
  return (




    <Box  sx={{
      
      color: "#000",
      display: "flex",
      flexDirection: "column",
      flexGrow:1
     
     
      


    }}>
      
      <MenuAppBar></MenuAppBar>
      <Outlet></Outlet>
    </Box>


  );
}

export default InicialTela;