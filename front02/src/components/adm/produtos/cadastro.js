import PhotoCamera from '@mui/icons-material/PhotoCamera.js';
import { Avatar, Box, Button, IconButton, ImageList, ImageListItem, TextField, Typography, Modal, Paper, styled, useTheme, Select, InputLabel, MenuItem } from '@mui/material';
import { uniqueId } from 'lodash';
import React from 'react';
import { api, url } from '../../../api.js'
import Swal from 'sweetalert2'
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
  color: theme.palette.getContrastText("#2e7d32"),
  backgroundColor: "#2e7d32",
  '&:hover': {
    backgroundColor: "#1b5e20",
  },
}));

function Produtoscad() {
  const theme = useTheme();
  const [produto, setProduto] = React.useState({ desc: '', tam: '', logos: [], preco: 0, url: '', und: 0, id_image: '', cat: [] })
  const [imagens, setIMG] = React.useState([])
  const [logos, setLogos] = React.useState([])
  const [IMGC, setIMGC] = React.useState(false)
  const [categorias, setCat] = React.useState([]);
  const [age, setAge] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openfp, setOpenfp] = React.useState(false);
  const handleOpenfp = () => setOpenfp(true);
  const handleClosefp = () => setOpenfp(false);



  React.useEffect(() => {
    api.get("/selectimagesP").then(r => {
      if (r.data.status) {
        let i = r.data.images;
        for (const key in i) {
          i[key].url = `${url}images/${i[key].key}`
        }
        setIMG(i)
      }
    })
  }, [IMGC])


  React.useEffect(() => {
    api.get("/categorias").then(r => {

      setCat(r.data.categorias)
    })
  }, [])

  console.log(produto)

  return (



    <Box sx={{
      bgcolor: "background.paper",
      flexGrow: 1,
      height: "100vh",
      width: "100%",
      display: "flex",
      // justifyContent: "space-around",
      alignItems: "stretch",
      // marginTop: theme.spacing(8),
      [theme.breakpoints.down("md")]: {
        flexDirection: "column"
      }
    }} >

      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          alignItems: "center",
          // background: "#fff",
          borderRadius: 3
          // marginTop: 1
        }}
        className='container'
      >
        <Avatar sx={{ width: 100, height: 100, marginBottom: 1 }} onClick={handleOpenfp} src={produto.url} alt='imagem produto'></Avatar>
        {logos.length > 0 &&
          <Paper elevation={0} sx={{ display: "flex", width: "100%", height: "10%", justifyContent: "space-evenly", background: "transparent" }}>
            {logos.map((logo, index) => (

              <Avatar key={logo.id} src={logo.url} onClick={() => {
                setLogos(a => (a.filter(i => i.id != logo.id)));
                setProduto(a => ({ ...a, logos: a.logos.filter(i => i != logo.id) }))
              }} alt="img"></Avatar>

            ))}
          </Paper>
        }

        {!!produto.cat && 
        <Paper elevation={0} sx={{ display: "flex", width: "100%", justifyContent: "space-evenly", background: "transparent" }}>
          {(categorias.filter(item => produto?.cat?.includes(item.id))).map((item) => (

            <ColorButton variant='outlined' onClick={() => {
              let c = produto.cat.filter(i => i != item.id)
              setProduto(a => ({ ...a, cat: c }))
            }} key={item.id}>{item.desc}</ColorButton>

          ))}
        </Paper>}



        <div style={{ width: "100%" }} className='row justify-content-around'>
          <TextField className='col' sx={{ margin: 1 }}
            value={produto.desc}
            onChange={(e) => setProduto(a => ({ ...a, desc: e.target.value }))}
            type="text" label="Descrição"
          />

          <TextField className='col' sx={{ margin: 1 }}
            value={produto.tam}
            onChange={(e) => setProduto(a => ({ ...a, tam: e.target.value }))}
            type="text" label="Tamanho" />
        </div>

        <div
          style={{ width: "100%" }} className='row justify-content-around'
        >
          <TextField className='col-2' sx={{ margin: 1 }}
            value={produto.preco}
            onChange={(e) => setProduto(a => ({ ...a, preco: e.target.value }))}
            type="number" label="Preço/UND" />

          <TextField className='col-2' sx={{ margin: 1 }}
            value={produto.und}
            onChange={(e) => setProduto(a => ({ ...a, und: e.target.value }))}
            type="number" label="Quantidade/UND" />

          {/* <select onChange={(e) => {
            const id = e.target.value;
            if (produto.cat.includes(id)) {
              let c = produto.cat.filter(i => (i != id));
              setProduto(a => ({ ...a, cat: c }));
              return
            }
            if (!produto.cat.includes(id)) {
              setProduto(a => ({ ...a, cat: [...a.cat, id] }))
              return
            }
            // setProduto(a=>({...a,cat:[...a.cat,e.target.value]}))
          }} style={{ width: "40%" }} className="form-select col-8" aria-label="Categoria">
            <option selected value={0}>selecione uma categoria</option>
            {categorias?.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.desc}</option>
            ))}

          </select> */}

          <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            sx={{color:theme.palette.mode=="light"?"#000":"#fff"}}
            label="Categorias"
            onChange={(e) => {
              setAge(e.target.value)
              
              if (produto.cat.includes(e.target.value)) {
                let c = produto.cat.filter(i => (i != e.target.value));
                setProduto(a => ({ ...a, cat: c }));
                return
              }
              if (!produto.cat.includes(e.target.value)) {
                setProduto(a => ({ ...a, cat: [...a.cat, e.target.value] }))
                return
              }
              setProduto(a=>({...a,cat:[...a.cat,e.target.value]}))
            }}
          >

            {categorias?.map(cat => (
              <MenuItem key={cat.id} name={cat} value={cat.id}>{cat.desc}</MenuItem>
            ))}

          </Select>
        </div>

        <Box component={"div"} sx={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: theme.spacing(2) }} >

          <Button onClick={async (e) => {
            e.preventDefault();
            api.post("/produtos", { ...produto }).then(r => {

              if (r.data.status) {
                Swal.fire(
                  'Produto Salvo!',
                  '',
                  'success'
                )
              }
              else {

                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'algo deu errado!',
                  // footer: '<a href="">Why do I have this issue?</a>'
                })

              }
            })
          }} variant="contained" color="success">Salvar</Button>


          <Button 
          variant='contained'
          color="success"
          sx={{
           
          }}
          onClick={handleOpen}>
            Escolher logos
            </Button>
          <IconButton className='col-1' id="Camera" color="success" aria-label="upload picture" component="label">
            <input id='img' hidden accept="image/*" type="file"
              onChange={(ee) => {


                const files = ee.target.files;
                let uploadedFiles = []
                // console.log(files)

                for (let iterator of files) {

                  uploadedFiles.push(
                    {
                      "file": iterator,
                      "id": uniqueId(),//definindo um id unico 
                      "name": iterator.name,
                      "prod": false,
                      "readableSize": iterator.size,
                      preview: URL.createObjectURL(iterator), // criando um link para preview da foto carregada
                      url: URL.createObjectURL(iterator),// sera usado para setar a variavel img no proprietario/index.js
                    }
                  )
                }



                // CRIANDO UM DATAFORM
                const data = new FormData();
                data.append('file', uploadedFiles[0].file, uploadedFiles[0].name);

                // SALVANDO NOVA IMAGEM

                try {
                  api.post(`/insertImageP`, data, {
                    // onUploadProgress: e => {
                    //   let progress = parseInt(Math.round((e.loaded * 100) / e.total));
                    //   setProgress(a => a + progress)
                    // }
                  }).then(r => {


                    // document.location.reload()

                    Swal.fire(
                      'Imagem Salva!',
                      '',
                      'success'
                    )
                    setIMGC(a => !a)


                  })

                } catch (error) {
                  console.log(error)
                  alert("formato nao aceito");
                }
              }}
            />
            <PhotoCamera />
          </IconButton>

        </Box>




      </Box>







      {/* selecionar as logos */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>


          <ImageList sx={{ width: 500, height: 450, marginTop: 2 }} cols={3} rowHeight={164}>
            {imagens.map((item) => (
              <ImageListItem sx={{ padding: 2 }} key={item.id}>
                <img
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  onClick={() => { setProduto(a => ({ ...a, logos: [...a.logos, item.id] })); setLogos(a => ([...a, { ...item }])) }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>
      {/* fotos principal */}
      <Modal
        open={openfp}
        onClose={handleClosefp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>


          <ImageList sx={{ width: 500, height: 450, marginTop: 2 }} cols={3} rowHeight={164}>
            {imagens.map((item) => (
              <ImageListItem sx={{ padding: 2 }} key={item.id}>
                <img
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  onClick={() => { setProduto(a => ({ ...a, id_image: item.id, url: item.url })); handleClosefp() }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>
    </Box>

  );
}

export default Produtoscad;