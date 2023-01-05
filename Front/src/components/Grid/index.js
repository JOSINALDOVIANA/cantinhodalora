import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import ComplexGrid from './card';

import { api, url } from '../../api';
import { Paper, Typography } from '@mui/material';

import "./style.css"


export default function GridContainer() {

  const [produtos, setProd] = React.useState([]);
  const [produtosFilter, setProdFilter] = React.useState([]);
  const [categorias, setCat] = React.useState([]);

  React.useEffect(() => {
    api.get("/produtos").then(r => {
      let p = r.data.produtos
      if (r.data.status) {

        for (const key in p) {
          p[key].img.url = url + "images/" + p[key].img.key;
          p[key].url = p[key].img.url;
          for (const key2 in p[key].logos) {
            p[key].logos[key2].url = url + "images/" + p[key].logos[key2].key
          }
        }
        setProd(p)
        setProdFilter(p)
      }
    })
  }, [])
  React.useEffect(() => {
    api.get("/categorias").then(r => {
      
      setCat(r.data.categorias)
    })
  }, [])
  function filtro(id){
    const l=document.querySelectorAll(".active2")
    l.forEach(element => {
      element.classList.remove("active2")
    });
    document.getElementById(`${id+"C"}`).classList.add("active2")
    api.get(`/categorias?id=${id}`).then(r => {
      let p = r.data.produtos
      

        for (const key in p) {
          p[key].img.url = url + "images/" + p[key].img.key;
          p[key].url = p[key].img.url;
          for (const key2 in p[key].logos) {
            p[key].logos[key2].url = url + "images/" + p[key].logos[key2].key
          }
        }
      
      
      setProdFilter(p)
    })
  }
  // console.log(produtosFilter)
  return (
    <Box sx={{
      flexGrow: 1,
     margin:2,
      color: "#000",
      
    }}>
      <Box className='carousel' sx={{display:"flex",flexGrow:1,margin:2,height:100,overflow:"scroll"}}>
        <Paper onClick={()=>{
          setProdFilter(produtos)
          const l=document.querySelectorAll(".active2")
          l.forEach(element => {
            element.classList.remove("active2")
          });
        }
          } sx={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",padding:2,margin:2}}><Typography>Todos</Typography></Paper>
        {categorias.map(cat=>(
          <Paper id={cat.id+"C"}  key={cat.id} className="" onClick={()=>{filtro(cat.id)}} sx={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",padding:2,margin:2}}><Typography>{cat.desc}</Typography></Paper>
        ))}
        
        
       

      </Box>
      <Grid container alignItems="center" spacing={2}>


        {produtosFilter?.map(p => (
          <Grid key={p.id} item xs={6} sm={4} md={3} lg={3}>
            <ComplexGrid
              img={p.url}
              desc={p.desc}
              tamanho={p.tam}
              valor={p.preco}
              logos={p.logos}
              id={p.id }/>
          </Grid>
        ))}


        
      </Grid>
    </Box>
  );
}
