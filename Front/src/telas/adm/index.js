
import React from 'react';
import { Outlet, useLocation,useNavigate} from 'react-router-dom';

import ResponsiveAppBar from '../../components/adm/appBar/appbaradm.js';


function Perfil() {
  const navegar=useNavigate();
  const rota=useLocation();
  const [dados,setDados]=React.useState({});
  React.useEffect(()=>{
  if(!rota.state){
    navegar("/login")
  }
  setDados(rota.state)
  },[])
  console.log(dados)
  return (
    <div className='fluid' style={{display:"flex",height:"100vh",flexDirection:"column"}}>
      <ResponsiveAppBar ></ResponsiveAppBar>
      
      <Outlet context={[dados,setDados]}></Outlet>
    </div>
  );
}

export default Perfil;