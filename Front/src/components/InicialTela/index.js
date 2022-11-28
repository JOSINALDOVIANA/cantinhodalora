import React, { useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MenuAppBar from '../AppBar/index';
import GridContainer from '../Grid/index'
import Torre from "../../assets/Torres.png"

import { Paper, styled, Typography, useTheme } from '@mui/material';

import { api, url } from '../../api.js';
const Img = styled('img')({

  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function InicialTela() {
  const [images, setImages] = useState([])
  const theme = useTheme();
  useEffect(() => {
    api.get("/imagesget").then(r => {
      if (r.data.status) {
        let im = r.data.images;
        for (const key in im) {
          im[key].url = `${url}images/${im[key].key}`
        }
        setImages(im)
      }
    })
  }, [])
  return (
    <React.Fragment>
      <CssBaseline />
      <MenuAppBar></MenuAppBar>
      <Container
        sx={{ paddingTop: theme.spacing(5), backgroundColor: "#fff" }}
      >
        <Paper
          sx={{
            flexGrow: 1,
            height: "50%",
            borderRadius: 0,
            position: "relative",

            color: "#000",
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(2),

          }}
          elevation={0}
        >
          <Img classNameName='img' alt="torre"
            sx={{
              marginTop: theme.spacing(2),
              width: theme.spacing(30),
              height: theme.spacing(20)
            }}
            src={Torre}></Img>

          <Typography variant='p' component="h1"
            sx={{
              fontFamily: "Oswald",
              textAlign: "justify",

              fontWeight: "100"

            }} >
            Promoção do dia, Na Compra de duas torres de R$50,00 ganhe uma caipirinha.
          </Typography>
        </Paper>
        


          

       
      </Container>
     
      <Container
      sx={{
        height:"100px",
        width:"300px",
        padding:"100px",
        marginBottom:"200px",
        alignItems:"center",
        justifyContent:"center",
     

      }}
      >
         <Typography
         sx={{
          fontFamily: "Oswald",
          textAlign: "justify",

          fontWeight: "200"

        }}>
        Nossos agradeciemntos a eles e elas, é sempre um prazer estar com vocês
      </Typography>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
             {images?.map((im,index)=>(
               index==0?<div key={im.idimage} className="carousel-item active" data-bs-interval="2000">
               <img src={im.url} className="d-block w-100" alt={im.name}/>
             </div>:
             <div key={im.idimage} className="carousel-item" data-bs-interval="2000">
             <img src={im.url} className="d-block w-100" alt={im.name}/>
           </div>
             ))}
             
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
      </Container>
      <Container maxWidth="lg" sx={{
        backgroundColor: "#fff",
        color: "#000",
        paddingBottom: 5,
        paddingTop: theme.spacing(1),
        marginTop:"100px"

      }}>
        <GridContainer></GridContainer>
      </Container>
      
    </React.Fragment>
  );
}

export default InicialTela;