import React, { useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

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




    <Container maxWidth="lg" sx={{
      backgroundColor: "#fff",
      color: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      flexGrow: 1,
      


    }}>
      <CssBaseline />
      <MenuAppBar></MenuAppBar>
      {images.length>0 && <Paper
        sx={{
          height: "300px",
          flexGrow: 1,
          padding: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom:2
        }}
        elevation={3}
      >

        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {images?.map((im, index) => (
              index == 0 ? <div key={im.idimage} className="carousel-item active" data-bs-interval="2000">
                <img width="auto" height={"250px"} style={{borderRadius:5}} src={im.url} className="d-block w-100" alt={im.name} />
              </div> :
                <div key={im.idimage} className="carousel-item" data-bs-interval="2000">
                  <img src={im.url} style={{borderRadius:5}} width="auto" height={"250px"} className="d-block w-100" alt={im.name} />
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
      </Paper>}
      <Paper
        sx={{
          flexGrow: 1,
          height: "auto",
          borderRadius: 1,
          overflow: "scroll",

          color: "#000",
          display: "flex",
          alignItems: "center",
          marginBottom: 2

        }}
        elevation={3}
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
      <GridContainer></GridContainer>
    </Container>


  );
}

export default InicialTela;