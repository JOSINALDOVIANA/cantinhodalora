import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
import BrahmaDPL from '../../assets/brahmaduplomaltelitro.jpg'
import CoronaLong from '../../assets/Corona.jpg'
import AmstelLitro from '../../assets/amstellitro.jpg'
import Agua from '../../assets/agua.jpg'
import Frozen from '../../assets/frozen.png'
import morango from '../../assets/morango.png'
import maracuja from '../../assets/maracuja.png'
import abacaxi from '../../assets/abacaxi.png'
import { api, url } from '../../api';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GridContainer() {

  const [produtos, setProd] = React.useState([]);

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
      }
    })
  }, [])
  // console.log(produtos)
  return (
    <Box sx={{
      flexGrow: 1,
      marginTop: 0,
      backgroundColor: "#fff",
      color: "#000",
      marginBottom: 2
    }}>
      <Grid container alignItems="center" spacing={2}>


        {produtos?.map(p => (
          <Grid key={p.id} item xs={12} sm={6} md={4} lg={4}>
            <ComplexGrid
              img={p.url}
              desc={p.desc}
              tamanho={p.tam}
              valor={p.preco}
              logos={p.logos} />
          </Grid>
        ))}


        
      </Grid>
    </Box>
  );
}
