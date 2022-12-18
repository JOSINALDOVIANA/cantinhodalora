import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import ComplexGrid from './card';

import { api, url } from '../../api';




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
