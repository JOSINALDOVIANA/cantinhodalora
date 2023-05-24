import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, FormControl, FormHelperText, ImageList, ImageListItem, Input, InputLabel, MenuItem, Modal, TextField, styled, useTheme } from '@mui/material';
import { api } from '../../../api';
import { set } from 'lodash';
import Promo from './index copy';
import { green } from '@mui/material/colors';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
  // width:"90%"
};
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[700],
  fontFamily: "Roboto",
  fontSize: "1em",
  fontWeight: "bold",
  '&:hover': {
    backgroundColor: green["A700"],

  },
}));

// import { Container } from './styles';

export default function Promo01(){
  const theme = useTheme();
  const [produtos, setProd] = useState([]);
  const [promo, setPromo] = useState([]);





  const [prodselct, setProdSelect] = useState(false);
  const [promoCad, setPromoCad] = useState({});
  const [imagens, setIMG] = React.useState([])
  const [IMGC, setIMGC] = React.useState(false)
  const [openfp, setOpenfp] = React.useState(false);
  const handleOpenfp = () => setOpenfp(true);
  const handleClosefp = () => setOpenfp(false);


  useEffect(() => {
    getPromos()
  }, [])

  useEffect(() => {
    api.get("/produtos").then(r => {
      setProd(r.data.produtos)
    })
  }, [])


  useEffect(() => {
    api.get("/selectimagesP").then(r => {
      if (r.data.status) {


        setIMG(r.data.images)
      }
    })
  }, [IMGC])

  function getPromos() {
    api.get("/promo").then(r => {
      setPromo(r.data.promo)
    })
  }
console.log(promo)
  return (
    <Box component="form" 
    onSubmit={(e) => {
      let obj = {};

      e.preventDefault();
      if (prodselct) {
        obj = { newdesc: e.target["newdesc"].value, id_prod: promoCad.id_prod, valpromo: e.target["valpromo"].value };

      } else {
        obj = { newdesc: e.target["newdesc"].value, valpromo: e.target["valpromo"].value, id_image: promoCad.img.id }

      }

      api.post("/promo", { ...obj }).then(r => {
        if (r.data.status) {
          alert("Promoção cadastrada");
          getPromos();

          return
        }
        alert("error ao cadastrar ")
        return
      })


    }} 
    sx={{ marginTop: theme.spacing(7), padding: theme.spacing(2)}}>
      <FormControl sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }} >
        <Avatar sx={{ width: 100, height: 100, marginBottom: 1 }} onClick={() => { handleOpenfp() }} src={promoCad?.img?.url||promoCad?.prod?.img?.url} alt='imagem produto'></Avatar>

        <TextField
          sx={{ width: "40%", marginBottom: theme.spacing(2) }}
          select
          name='selectprod'
          label="selecione um produto"
          defaultValue=""
          helperText="seleção opcional"
        >
          <MenuItem onClick={() => { setProdSelect(false); setPromoCad({}) }}  >

          </MenuItem>
          {produtos.map((prod) => (
            <MenuItem onClick={() => { setProdSelect(true); setPromoCad(a => ({ ...a, id_prod: prod.id, img: prod.img })) }} key={prod.id + "prod"} value={prod.id}>
              {prod.desc + " " + prod.tam}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ width: "40%", marginBottom: theme.spacing(2) }}
          name="newdesc"
          label="Desc. Promoção"
          multiline
          rows={5}
          value={promoCad.newdesc}
          onChange={e=>{
            setPromoCad(a=>({...a,newdesc:e.target.value}))
          }}

        />

        <Box sx={{ display: "flex", width: "45%", justifyContent: "space-around",[theme.breakpoints.down('md')]:{flexDirection:"column"} }}>

          <TextField
            sx={{ marginBottom: theme.spacing(2) }}
            id="valpromo"
            label="Valor"
            type="number"
            value={promoCad.valpromo}
            onChange={e=>{
              setPromoCad(a=>({...a,valpromo:e.target.value}))
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />


          {/* </Box> */}
          <ColorButton variant='contained' type='submit'>enviar</ColorButton>

        </Box>
      </FormControl>

      {/* fotos principal */}
      <Modal
        open={openfp}
        onClose={handleClosefp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>


          <ImageList sx={{ width: 500, height: 450, marginTop: 2, background: "#fff" }} cols={3} rowHeight={164}>
            {imagens.map((item) => (
              <ImageListItem sx={{ padding: 2 }} key={item.id}>
                <img
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  onClick={() => { setPromoCad(a => ({ ...a, img: { ...item }, id_image: item.id })); handleClosefp() }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>

      <Promo proms={{
        promocoes: promo,
        atualizarPromo: setPromo,
        setPromoCad:setPromoCad,
      }}></Promo>

    </Box>
  );
}

