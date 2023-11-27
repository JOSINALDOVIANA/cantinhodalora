import PhotoCamera from '@mui/icons-material/PhotoCamera.js';
import { Avatar, Box, Button, IconButton, ImageList, ImageListItem, TextField, Typography, Modal, Paper, styled, useTheme, Select, InputLabel, MenuItem, Grid, FormControl, ButtonBase } from '@mui/material';
import { uniqueId } from 'lodash';
import React from 'react';
import { api, url } from '../../../api.js'
import Swal from 'sweetalert2'
import {DeleteForever,ReplyAll} from '@mui/icons-material'





const BoxStyle = styled(Paper)(({ theme }) => ({
  // transition: theme.transitions.create(['width',0.5]),
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: "70%",
  height: "70%",
  overflow: "scroll"


}))

const Img = styled("img")({
  // margin: "auto",
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
  // mostra o progresso aio enviar uma Imagem
  const [progress, setProgress] = React.useState(0)
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


  // controle do select que aparece quando a tela for menor que "md"

  const [age2, setAge2] = React.useState('');
  const handleChange2 = (event) => {
    setAge2(event.target.value);
    setProduto({ ...produtos.filter(i => i.id == event.target.value)[0] })
  };


  //vai carregar todas as imagens de produtos
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

  //carrega as categorias de produtos
  React.useEffect(() => {
    api.get("/categorias").then(r => {

      setCat(r.data.categorias)
    })
  }, [])

  //carrega os produtos
  React.useEffect(() => {
    api.get("/produtos").then(r => {

      if (r.data.status) {


        setProdutos(r.data.produtos);
      }
    });
  }, [IMGC]);



  return (


    //box principal
    <Box
      sx={{
        bgcolor: "background.paper",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        position:"relative",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",


        }
      }} >
         <IconButton sx={{width:"5px", position: "absolute", top: theme.spacing(3), right: theme.spacing(3), [theme.breakpoints.up("md")]: { top: theme.spacing(3), left: theme.spacing(3) } }}  color="success" component="label">
          <input id='img' hidden accept="image/*" type="file"
            onChange={(ee) => {


              const files = ee.target.files;
              let uploadedFiles = []


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
              console.log(data)

              try {
                api.post(`/insertImageP`, data, {
                  onUploadProgress: e => {
                    let progr = parseInt(Math.round((e.loaded * 100) / e.total));
                    setProgress(a => a + progr)
                  }
                }).then(r => {

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

      {/* box de inserção de dados */}
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "50%",
         
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          },
         

        }}

      >

       

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "scroll",




          }}
        >
          {/* foto do produto */}
          <Avatar variant='rounded' sx={{ width: theme.spacing(10), height: theme.spacing(10), marginBottom: theme.spacing(2) }} onClick={handleOpenfp} src={produto?.img?.url}  alt='imagemproduto'></Avatar>
          {/* logos relacionadas ao produto */}
          {produto?.logos?.length > 0 &&
            <Paper elevation={0} sx={{ display: "flex", width: "100%", height: "10%", justifyContent: "space-evenly", background: "transparent" }}>
              {produto?.logos?.map((logo, index) => (

                <Avatar key={logo.id + uniqueId()} src={logo.url} srcSet={logo.url} onClick={() => {
                  // setLogos(a => (a.filter(i => i.id != logo.id)));
                  setProduto(a => ({ ...a, logos: a.logos.filter(i => i.id != logo.id) }))
                }} alt="img_logo">

                </Avatar>

              ))}
            </Paper>
          }
          {/* categorias do produto */}
          {!!produto.cat &&
            <Paper elevation={0} sx={{ display: "flex", width: "100%", justifyContent: "space-evenly", background: "transparent" }}>
              {produto?.cat?.map((item) => (

                <ColorButton variant='outlined'
                  onClick={() => {
                    let c = produto.cat.filter(i => i.id != item.id)
                    setProduto(a => ({ ...a, cat: c }))
                  }}
                  key={item.id + uniqueId()}>
                  {item.desc}
                </ColorButton>

              ))}
            </Paper>}

          <Box component={FormControl} sx={{ width: "100%", display: "flex", [theme.breakpoints.up("md")]: { flexDirection: "row" } }} >

            {/* input Descrição */}
            <TextField sx={{ margin: 1 }}
              value={produto.desc}
              onChange={(e) => setProduto(a => ({ ...a, desc: e.target.value }))}
              type="text"
              label="Descrição"
            />
            {/* input Tamanho */}
            <TextField sx={{ margin: 1 }}
              value={produto.tam}
              onChange={(e) => setProduto(a => ({ ...a, tam: e.target.value }))}
              type="text" label="Tamanho" />

          </Box>

          <Box
            sx={{ width: "100%", display: "flex", [theme.breakpoints.up("md")]: { flexDirection: "row" } }}
            component={FormControl}
          >
            {/* input Preço */}
            <TextField className='col-2'
              sx={{ margin: 1 }}
              value={produto.preco}
              onChange={(e) => setProduto(a => ({ ...a, preco: e.target.value }))}
              type="number"
              label="Preço/UND"
            />
            {/* input Quantidade */}
            <TextField className='col-2'
              sx={{ margin: 1 }}
              value={produto.und}
              onChange={(e) => setProduto(a => ({ ...a, und: e.target.value }))}
              type="number" label="Quantidade/UND"
            />


          </Box>
          {/* input/select categorias */}
          <FormControl fullWidth>

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
                <MenuItem key={cat.id + uniqueId} value={cat.id}>{cat.desc}</MenuItem>
              ))}

            </Select>
            {/* select de produtos caso a tela seja pequena*/}
            <Box sx={{
              mt: 2,
              [theme.breakpoints.up("md")]: {
                display: 'none'
              }
            }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Produtos</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age2}
                  label="Produtos"
                  onChange={handleChange2}
                >
                  {produtos?.map((p, i) => (
                    <MenuItem key={p.id + uniqueId()} value={p.id}>{p.desc + ' ' + p.tam}</MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Box>
          </FormControl>

          {/* espaço dos botoes */}
          <Box component={FormControl} sx={{ mt: 2, width: "100%", display: "flex", gap: 2 }} >

            {/* botaão Salvar */}
            <Button
              onClick={async (e) => {
                e.preventDefault();

                if (!!produto.id) {
                  api.put("/produtos", { ...produto, cat: produto.cat.map(c => (c.id)), logos: produto.logos.map(l => (l.id)) }).then(r => {

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
                  api.post("/produtos", { ...produto, cat: produto.cat.map(c => (c.id)), logos: produto.logos.map(l => (l.id)) }).then(r => {

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
            {/* botão de escolha de logos */}
            <Button
              variant='contained'
              color="success"
              sx={{

              }}
              onClick={handleOpen}>
              Escolher logos
            </Button>
            {/* excluir produto selecionado */}

          {
            !!produto.id?
            <Button 
            startIcon={<DeleteForever/>}
               variant='contained'
               color='error'

               onClick={() => {
                 api.delete(`/produtos?id=${produto.id}`).then(r => {
                   if (r.data.status) {
                     let pr = produtos.filter(item => item.id != produto.id);

                     setProdutos(pr);

                   
                   }
                 });
               }}

             >
               Excluir
             </Button>:null
          }
          {
            !!produto.id?
            <Button 
            startIcon={<ReplyAll/>}
               variant='contained'
               color='success'

               onClick={() => {
                 setProduto({ desc: '', tam: '', logos: [], preco: 0, img: {}, und: 0, id_image: '', cat: [] })
               }}

             >
               Limpar
             </Button>:null
          }
            





          </Box>
        </Box>


      </Box>


      {/* box para carregar os produtos */}
      <Box
        sx={{
          width: "50%",
          overflow: "scroll",
          maxHeight:"80%",
          
          
         
          marginRight: theme.spacing(1),

          [theme.breakpoints.down("md")]: {

            display: "none"
          }
        }}
      >

        <Grid
          container        
          sx={{ overflow: "scroll" }}
          
          spacing={1} >
          {
            produtos?.map(p => (
              <Grid
               
                key={p.id + uniqueId()}
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
                    overflow: "hidden",
                    height:"250px",
                    
                  }}
                 
                  onClick={() => {
                    setProduto({ ...p });
                  }}

                >





                  <Img

                    alt={p.desc}
                    src={!!p.img ? url + "images/" + p.img.key : ""}
                    sx={{ borderRadius: 0, width: "100%", height: "90%",objectFit:"cover" }} />



                  <Typography sx={{  fontSize: "0.7em",width:"90%",textAlign:"center" }} noWrap variant="subtitle1" component="p">
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
        <BoxStyle >


          <ImageList sx={{ width: "auto", height: "auto", marginTop: 2 }} rowHeight={"auto"} cols={4}>
            {imagens?.map((item) => (
              <ImageListItem sx={{ padding: 2 }} key={item.id + uniqueId()}>
                
                <img
                  onClick={() => { setProduto(a => ({ ...a, logos: [...a.logos, item] })) }}

                  alt={item.name}
                  src={item.url}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxHeight: "5em",
                    maxWidth: "5em",
                    objectFit: "cover"
                  }} />


               
              </ImageListItem>
            ))}
          </ImageList>
        </BoxStyle>
      </Modal>

      {/* fotos principal */}
      <Modal
        open={openfp}
        onClose={handleClosefp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxStyle >
        <ImageList sx={{ width: "auto", height: "auto", marginTop: 2 }} rowHeight={"auto"} cols={4}>
            {imagens?.map((item) => (
              <ImageListItem sx={{ padding: 2 }} key={item.id + uniqueId()}>
                <img
                  onClick={() => { setProduto(a => ({ ...a, id_image: item.id, img: { ...item } })); handleClosefp() }}

                  alt={item.name}
                  src={item.url}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxHeight: "5em",
                    maxWidth: "5em",
                    objectFit: "cover"
                  }} />

              </ImageListItem>
            ))}
          </ImageList>
        </BoxStyle>
      </Modal>


    </Box>

  );
}

export default Produtoscad;