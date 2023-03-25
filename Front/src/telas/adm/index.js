
import React from "react";
import { Outlet} from "react-router-dom";

import ResponsiveAppBar from "../../components/adm/appBar/appbaradm.js";


function Perfil() {
  
	return (
		<div className='fluid' style={{display:"flex",height:"100vh",flexDirection:"column"}}>
			<ResponsiveAppBar></ResponsiveAppBar>
      
			<Outlet></Outlet>
		</div>
	);
}

export default Perfil;