import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../api';

// import { Container } from './styles';

function Useredit() {
    let rota=useLocation().state
    const [dados,setdados]=useState(rota)
    console.log(dados)
  return (
    <table className="table caption-top table-responsive">
  {/* <caption>List of users</caption> */}
  <thead className='table-dark'>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Nome</th>
      <th scope="col">E-mail</th>
      <th scope="col">Senha</th>
      <th scope="col">Ação</th>

    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">{dados.id}</th>
      <td><input onChange={(e)=>{ setdados(a=>({...a,[`${e.target["name"]}`]:e.target.value}))}} type="text" name='name' style={{border:0,textDecoration:"none",outline:"none"}} value={dados.name} ></input></td>
      <td><input onChange={(e)=>{ setdados(a=>({...a,[`${e.target["name"]}`]:e.target.value}))}} type="text" style={{border:0,textDecoration:"none",outline:"none"}} name="email" value={dados.email} ></input></td>
      <td><input onChange={(e)=>{ setdados(a=>({...a,[`${e.target["name"]}`]:e.target.value}))}} type="text" style={{border:0,textDecoration:"none",outline:"none"}} name="password" value={dados.password} ></input></td>
      <td><input onClick={()=>{
        api.post("/update",{...dados}).then(r=>{
            alert(r.data.mensagem)
        })
      }} type="button" style={{backgroundColor:"#379237",border:0,borderRadius:"3px"}} value="Salvar"></input></td>
    </tr>    
  </tbody>
</table>
  );
}

export default Useredit;