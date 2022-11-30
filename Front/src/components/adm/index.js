import { Button, Container, ImageListItem, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api, url } from '../../api.js';


function Perfil() {
    const dados=useLocation();
    const [images,setImages]=useState([]);
    useEffect(()=>{
        api.get("/imagesget").then(r=>{
            setImages(r.data.images)
        })
    },[])
    console.log(images)
  return (
    <Container sx={{display:"flex",height:"100vh",flexDirection:"column",padding:2}}>
       <Paper elevation={3} sx={{ display:"flex",width:"100%",height:"300px",overflow:"scroll"}}>
       {
        images?.map(im=>(
        <Paper sx={{display:"flex",justifyContent:"space-around",alignItems:"center",flexDirection:"column"}} key={im.idimage} elevation={3} >
            
         <img style={{width:"150px",margin:5,height:"50%"}} src={url+"images/"+im.key+"?w=150&h=150"} alt={im.name}></img>

         <Button onClick={()=>{
            api.delete(`${url}${im.delete}`).then(r=>{
             
              if(r.data.status){document.location.reload()}
             else{ alert("erro ao excluir"); document.location.reload()}
            })
          }} variant="contained" color="error">excluir</Button>



        </Paper>))
    }
       </Paper>
    </Container>
  );
}

export default Perfil;