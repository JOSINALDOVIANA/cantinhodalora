import * as React from 'react';

import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel'
import Grid from '@mui/material/Grid';
import ComplexGrid from './card';

import { api, url } from '../../api';
import { Paper, Typography, useTheme } from '@mui/material';

import "./style.css"
import { SearchContex } from '../../routs';
import { uniqueId } from 'lodash';




export default function GridContainer() {
  const [search, setSearch] = React.useContext(SearchContex);
  // console.log(search)
  const theme = useTheme();

  const [produtos, setProd] = React.useState([]);
  const [play, setPlay] = React.useState(true);
  const [produtosFilter, setProdFilter] = React.useState([]);
  const [categorias, setCat] = React.useState([]);


  //caso algo seja digitado no campo de pesquisa isso executa
  React.useEffect(() => {    
    setPlay(false)  

    

      setProdFilter(produtos.filter(i => i.desc.toUpperCase().includes(search.toUpperCase())))
    


  }, [search])

  //carrega todos os produtos
  React.useEffect(() => {
    api.get("/produtos").then(r => {
      let p = r.data.produtos
      if (r.data.status) {
        setProd(p)
        setProdFilter(p)
      }
    })
  }, [])
  //carrega todas as categorias
  React.useEffect(() => {
    api.get("/categorias").then(r => {
      setCat(r.data.categorias)
    })
  }, [])

  //controla o filtro qaundo se clica numa categoria
  function filtro(id) {
    const l = document.querySelectorAll(".active2")
    l.forEach(element => {
      element.classList.remove("active2")
    });
    document.getElementById(`${id + "C"}`).classList.add("active2")

    setProdFilter(() => (produtos.filter(p => p.cat.filter(c => c.id == id).length > 0)))




  }





  return (
    <Box

    >
      <Box sx={{ display: "flex", flexGrow: 1, margin: 2, overflow: "scroll" }}>

        <Paper
          elevation={6}
          onClick={() => {
            setProdFilter(produtos)
            setPlay(false)
            const l = document.querySelectorAll(".active2")
            l.forEach(element => {
              element.classList.remove("active2")
            });
          }}
          sx={{ cursor: "pointer", display: "flex", height: "30%", justifyContent: "center", alignItems: "center", padding: 2, margin: 2, width: "auto" }}>
          <Typography>Todos</Typography>
        </Paper>
        {/* <Carousel autoPlay={play} indicators={true} sx={{ width: "90%" }} onChange={(e) => { filtro(categorias[e].id) }}>
          {categorias.map(cat => (
            <Box key={cat.id+uniqueId()} sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Paper elevation={1} id={cat.id + "C"}  onClick={() => { filtro(cat.id); setPlay(false) }} sx={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", padding: 2, margin: 2, width: "auto" }}><Typography>{cat.desc}</Typography></Paper>
            </Box>
          ))}

        </Carousel> */}

        <Box
          component={"div"}
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            flexFlow: 1,
            overflow: "scroll"

          }}
        >

          {categorias.map(cat => (
            
              <Paper 
              elevation={1} 
              key={cat.id + uniqueId()} 
              id={cat.id + "C"} 
              onClick={() => { filtro(cat.id); setPlay(false) }} 
              sx={{ cursor: "pointer", padding: 2, width: "auto","& ":{marginRight:1} }}><Typography noWrap>{cat.desc}</Typography></Paper>
           
          ))}


        </Box>




      </Box>
      <Grid container alignItems="center" spacing={1} >


        {produtosFilter?.map(p => (
          <Grid
            // direction={theme.breakpoints.down("md") ? "column" : "row"}
            key={p.id + uniqueId()}
            item
            xs={6}
            sm={6}
            md={4}
            lg={2}

          >
            <ComplexGrid
              img={!!p.id_image ? p.img.url : ""}
              desc={p.desc}
              tamanho={p.tam}
              valor={p.tam == "Carteira (20 UND)" ? 20 : p.preco}
              logos={p.logos}
              id={p.id}
              und={p.und} />
          </Grid>
        ))}



      </Grid>
    </Box>
  );
}
