import * as React from 'react';
import { DadosContext } from '../../routs';
import MenuAppBar from '../AppBar';
import {  CssBaseline } from '@mui/material';
import {  Outlet, useNavigate } from 'react-router-dom';










function TelaCliente() {



  return (
    <>
      <CssBaseline />
      <MenuAppBar></MenuAppBar>
            <Outlet></Outlet>



    </>
  );
}
export default TelaCliente;