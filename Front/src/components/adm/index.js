import { Container} from '@mui/material';
import React from 'react';
import { Outlet} from 'react-router-dom';

import ResponsiveAppBar from '../AppBar/appbaradm.js';


function Perfil() {
   
  
  return (
    <Container sx={{display:"flex",height:"100vh",flexDirection:"column",padding:2}}>
      <ResponsiveAppBar></ResponsiveAppBar>
      
      <Outlet></Outlet>
    </Container>
  );
}

export default Perfil;