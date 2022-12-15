import { Container} from '@mui/material';
import React from 'react';
import { Outlet, useLocation} from 'react-router-dom';

import ResponsiveAppBar from '../AppBar/appbaradm.js';


function Perfil() {
   
  const dados=useLocation()
  console.log(dados)
  return (
    <div className='fluid' style={{display:"flex",height:"100vh",flexDirection:"column"}}>
      <ResponsiveAppBar user={dados.state}></ResponsiveAppBar>
      
      <Outlet ></Outlet>
    </div>
  );
}

export default Perfil;