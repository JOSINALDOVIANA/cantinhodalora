import * as React from 'react';
import { styled,useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ComplexGrid from './card';
import ButtonBase from '@mui/material/ButtonBase';

import logoHeineken from '../../assets/heineken.svg';
import logostella from '../../assets/stella.svg';
import logoRoscoff from '../../assets/roscoff.png';
import logoorloff from '../../assets/orlof.jpg';
import logoBudwaiser from '../../assets/budweiser.jpg';
import logoskol from '../../assets/skol.svg'
import logoitaipava from '../../assets/itaipava.svg'
import logobrahma from '../../assets/brahma.svg'
import imgitaipava269 from '../../assets/itaipava269.jpg';
import imgAbacaxi from '../../assets/abacaxi.jpg';
import imgItaipava350 from '../../assets/itaipava350.jpg';
import imgItaipavalitro from '../../assets/itaipavalitro.jpg';

import imglongSkol from '../../assets/long_skol.jpg'
import imgtorre from '../../assets/torre.jpg'
import imgPromo from '../../assets/Torres.png'
import imgSkolPilse from '../../assets/skolpilse.jpg'
import imgSkolpm from '../../assets/skol_pm.jpg'
import imgSkolpm269 from '../../assets/skol_pm_269.jpg'
import imgBrahmadp600 from '../../assets/brahmadp600.jpg'
import imgBrahmadp350 from '../../assets/brahmadp350.jpeg'
import imgimperio from '../../assets/imperio.jpg'
import imgBrahmaChop from '../../assets/brahmaC.jpg'
import imgIcelimao from '../../assets/icelimao.jpg'
import imgRedbull from '../../assets/redbull.jpg'
import imgBohemia from '../../assets/bohemia.jpg'
import imglongGt from '../../assets/long_gt.jpg'
import imgAmistel350 from '../../assets/amistel.jpg'
import imgRefrigerantes from '../../assets/Refrigerentes.jpg'
import imgCoco from '../../assets/coco.jpg'
import imgCaipirinha from '../../assets/caipirinha.jpg'
import imgLucky from '../../assets/luckystrike.png'
import imgKent from '../../assets/kent.png'
import imgCalton from '../../assets/calton.png'
import imgCaltonC from '../../assets/caltoncereja.jpeg'
import imghalls from '../../assets/halls.jpg'
import imgchiclet from '../../assets/chiclet.jpg'
import imgOpclient from '../../assets/joinha.jpg'
import imgHeineken from '../../assets/heineken.jpg'
import imgBudlong from '../../assets/budweiserlong.jpg'
import imgStellalong from '../../assets/stella.jpg'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GridContainer() {
  const theme = useTheme();
  return (
    <Box sx={{
      flexGrow: 1,
      marginTop: 0,
      backgroundColor:"#fff",
      color:"#000",
    }}>
      <Grid container alignItems="center" spacing={2}>
        {/* <Grid item xs={12} sm={6} md={4} lg={4}>
          <ButtonBase onClick={() => window.open("https://opclient-web.herokuapp.com/totem/ce06443882c49b050a38d99b755f78c7/8a1cb6b06cbf0d2ec6a6556d074ebedb-00595512240")} >
            <ComplexGrid
              bg="null"
              img={imgOpclient}
              desc="Gostou! Deixe-nos suas sugestões, são de Grande Valor para a melhoria de nossos serviços. "
              tamanho=""
              valor="0,00"
              logos={[]} />
          </ButtonBase>
        </Grid> */}

<Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imgtorre}
            desc="Torre"
            tamanho="3.5 L"
            valor=" 50,00"
            logos={[logoskol, logoitaipava, logobrahma]} />
        </Grid>


        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imgtorre}
            desc="Torre"
            tamanho="2.5 L"
            valor=" 40,00"
            logos={[logoskol, logoitaipava, logobrahma]} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imglongSkol}
            desc="Skol Sense"
            tamanho=" 269 ML"
            valor="15,00"
            logos={[]} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imglongGt}
            desc="Skol GT"
            tamanho=" 269 ML"
            valor="15,00"
            logos={[]} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imgHeineken}
            desc="Heineken"
            tamanho=" 330 ML"
            valor="10,00"
            logos={[]} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imgStellalong}
            desc="Stella"
            tamanho=" 275 ML"
            valor="10,00"
            logos={[]} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imgBudlong}
            desc="Budweiser"
            tamanho=" 330 ML"
            valor="10,00" logos={[]} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imgitaipava269}
            desc="Itaipava"
            tamanho=" 269 ML"
            valor="5,00"
            logos={[]} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid
            img={imgItaipava350}
            esc="Itaipava"
            tamanho=" 350 ML"
            valor="5,00"
            logos={[]} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgItaipavalitro} desc="Itaipava" tamanho=" 1 L" valor="15,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgAbacaxi} desc="Abacaxi" tamanho="" valor="12,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgSkolPilse} desc="Skol Pilse" tamanho=" 1 L" valor="15,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgSkolpm} desc="Skol Puro Malte" tamanho=" 1 L" valor="15,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgSkolpm} desc="Skol Puro Malte" tamanho=" 600 ML" valor="10,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgSkolpm269} desc="Skol Puro Malte" tamanho=" 269 ML" valor="5,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgSkolpm269} desc="Skol Puro Malte" tamanho=" 350 ML" valor="5,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgBrahmadp600} desc="Brahma Duplo Malte" tamanho=" 600 ML" valor="10,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgBrahmadp350} desc="Brahma Duplo Malte" tamanho=" 350 ML" valor="8,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgBrahmaChop} desc="Brahma Chop " tamanho=" 350 ML" valor="5,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgIcelimao} desc="Ice Limão" tamanho=" 275 ML" valor="10,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgRedbull} desc="Red Bull" tamanho="" valor="15,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgBohemia} desc="Bohemia" tamanho=" 350 ML" valor="5,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgAmistel350} desc="Amstel" tamanho=" 350 ML" valor="5,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgRefrigerantes} desc="Refrigerantes" tamanho=" 350 ML" valor="5,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgimperio} desc="Cerveja Imperio puro malte" tamanho=" 269 ML" valor="5,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgCoco} desc="COCO Gelado" tamanho="" valor="5,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgCaipirinha} desc="Caipirinha" tamanho=" 500 ML" valor="10,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgCaipirinha} desc="Caipiroska" tamanho=" 500 ML" valor="12,00" logos={[logoRoscoff, logoorloff]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgLucky} desc="Lucky Strike" tamanho=" 20 UND" valor="20,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgLucky} desc="Lucky Strike" tamanho=" 1 UND" valor="1,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgCaltonC} desc="DUNHILL Mentolado" tamanho=" 20 UND" valor="20,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgCaltonC} desc="DUNHILL Mentolado" tamanho=" 1 UND" valor="1,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgCalton} desc="DUNHILL Bland" tamanho=" 1 UND" valor="1,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgCalton} desc="DUNHILL Bland" tamanho=" 20 UND" valor="20,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgKent} desc="Kent" tamanho=" 20 UND" valor="20,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgKent} desc="Kent" tamanho=" 1 UND" valor="1,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imghalls} desc="Halls" tamanho=" 1 UND" valor="2,00" logos={[]} ></ComplexGrid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ComplexGrid img={imgchiclet} desc="Chiclets" tamanho=" 4 UND" valor="1,00" logos={[]} ></ComplexGrid>
        </Grid>
      </Grid>
    </Box>
  );
}
