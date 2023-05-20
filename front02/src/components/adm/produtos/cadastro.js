import PhotoCamera from '@mui/icons-material/PhotoCamera.js';
import { Avatar, Box, Button, IconButton, ImageList, ImageListItem, TextField, Typography, Modal, Paper, styled, useTheme, Select, InputLabel, MenuItem, Grid } from '@mui/material';
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

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#2e7d32"),
  backgroundColor: "#2e7d32",
  '&:hover': {
    backgroundColor: "#1b5e20",
  },
}));

function Produtoscad() {
  // carrega o tema
  const theme = useTheme();
  //inicializa o produto a ser criado
  const [produto, setProduto] = React.useState({ desc: '', tam: '', logos: [], preco: 0, img: {}, und: 0, id_image: '', cat: [] })
  //carrega todos os produtos ja cadastrados
  const [produtos, setProdutos] = React.useState([])
  //carrega todas a imagens de produtos do sistema
  const [imagens, setIMG] = React.useState([])
  //controla o carregamento de imagens de produtos quando adicionamos nova imagem
  const [IMGC, setIMGC] = React.useState(false)
  //carrega as categorias
  const [categorias, setCat] = React.useState([]);
  //controle para o select
  const [age, setAge] = React.useState("");

  //controles para o modal de carregamento de logos
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //controles para o modal de escolha de imagem principal
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

  React.useEffect(() => {
    api.get("/produtos").then(r => {

      if (r.data.status) {


        setProdutos(r.data.produtos);
      }
    });
  }, [IMGC]);

  // console.log(categorias)
  // console.log(produto)

  return (


    //box principal
    <Box
      sx={{
        bgcolor: "background.paper",
        flexGrow: 1,
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",

        [theme.breakpoints.down("md")]: {
          flexDirection: "column"
        }
      }} >

      {/* box de inserção de dados */}
      <Box
        sx={{
          bgcolor: "background.paper",
          // backgroundColor:"#e02141",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column"
          },
          "& +": {
            width: "50%"
          },

          borderRadius: 3

        }}
        className='container'
      >

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Avatar variant='rounded' sx={{ width: theme.spacing(10), height: theme.spacing(10), marginBottom: theme.spacing(2) }} onClick={handleOpenfp} src={produto?.img?.url} srcSet={produto?.img?.url} alt='imagem produto'></Avatar>
          {produto?.logos?.length > 0 &&
            <Paper elevation={0} sx={{ display: "flex", width: "100%", height: "10%", justifyContent: "space-evenly", background: "transparent" }}>
              {produto?.logos?.map((logo, index) => (

                <Avatar key={logo.id} src={logo.url} srcSet={logo.url} onClick={() => {
                  // setLogos(a => (a.filter(i => i.id != logo.id)));
                  setProduto(a => ({ ...a, logos: a.logos.filter(i => i.id != logo.id) }))
                }} alt="img_logo">

                </Avatar>

              ))}
            </Paper>
          }

          {!!produto.cat &&
            <Paper elevation={0} sx={{ display: "flex", width: "100%", justifyContent: "space-evenly", background: "transparent" }}>
              {produto?.cat?.map((item) => (

                <ColorButton variant='outlined'
                  onClick={() => {
                    let c = produto.cat.filter(i => i.id != item.id)
                    setProduto(a => ({ ...a, cat: c }))
                  }} key={item.id}>
                  {item.desc}
                </ColorButton>

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



            <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              sx={{ color: theme.palette.mode == "light" ? "#000" : "#fff" }}
              label="Categorias"
              onChange={(e) => {
                setAge(e.target.value);
                let c = categorias.filter(item => item.id == e.target.value)

                setProduto(a => ({ ...a, cat: [...a.cat, ...c] }))




              }}
            >

              {categorias?.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>{cat.desc}</MenuItem>
              ))}

            </Select>
          </div>

          <Box component={"div"} sx={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: theme.spacing(2) }} >

            <Button
              onClick={async (e) => {
                e.preventDefault();

                if (!!produto.id) {
                  api.put("/produtos", { ...produto }).then(r => {

                    if (r.data.status) {
                      Swal.fire(
                        'Produto Atualizado!',
                        '',
                        'success'
                      );
                      setIMGC(a => !a);
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
                }
                else {
                  api.post("/produtos", { ...produto }).then(r => {

                    if (r.data.status) {
                      Swal.fire(
                        'Produto Inserido!',
                        '',
                        'success'
                      );
                      setIMGC(a => !a);
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
                }

              }}
              variant="contained"
              color="success">
              Salvar
            </Button>


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


      </Box>

      {/* box para carregar os produtos */}
      <Box
        sx={{
          width: "50%",
          overflow: "scroll",
          height: "90%",
          // margin:`${theme.spacing(1)}${0}${theme.spacing(1)}${0}`,
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          marginRight: theme.spacing(1),

          [theme.breakpoints.down("md")]: {
            height: "50%",
            width: "100%",
            marginTop: theme.spacing(2),
            // marginBottom:theme.spacing(2),
            // marginRight:theme.spacing(1),
          }
        }}
      >

        <Grid container flexGrow={1} sx={{ overflow: "scroll" }} alignItems="center" spacing={1} >
          {
            produtos?.map(p => (
              <Grid
                // direction={theme.breakpoints.down("md")?"column":"row"}
                key={p.id}
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}


              >
                <Paper

                  elevation={4}
                  sx={{
                    display: "flex",
                    borderRadius: 1,
                    flexDirection: "column",
                    fontFamily: "Roboto",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 1,
                    overflow: "hidden"


                  }}
                  className='card'
                  onClick={() => {
                    setProduto({ ...p });
                  }}

                >





                  <Img

                    alt={p.desc}
                    src={!!p.img ? url + "images/" + p.img.key : ""}
                    sx={{ borderRadius: 0, width: 100, height: 100, margin: 2 }} />



                  <Typography sx={{ color: "#404E5C", fontSize: "0.9em", width: "90%" }} noWrap variant="subtitle1" component="p">
                    {p.desc + " " + p.tam}
                  </Typography>







                </Paper>
              </Grid>
            ))
          }

        </Grid>

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
                  onClick={() => { setProduto(a => ({ ...a, logos: [...a.logos, item] })) }}
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
                  onClick={() => { setProduto(a => ({ ...a, id_image: item.id, img: { ...item } })); handleClosefp() }}
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