import React from 'react';
import dayjs from 'dayjs';
import locale_pt from 'dayjs/locale/pt-br';

import { Chip,Box,IconButton,Avatar,Button, Divider, FormControl, FormLabel, ImageList, ImageListItem, ImageListItemBar, InputAdornment, Modal, OutlinedInput, Paper, TextField, useTheme, styled } from '@mui/material';
import { Delete, Visibility, VisibilityOff } from '@mui/icons-material';


import { Navigate, useNavigate } from 'react-router-dom';
import { uniqueId } from 'lodash';
import Swal from 'sweetalert2';
import axios from 'axios';
import { DadosContext } from '../../../routs';
import { api } from '../../../api';


const BoxStyle = styled(Paper)(({ theme }) => ({
    transition: theme.transitions.create(['width', 0.5]),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: "85%",
    height: "70%",
    overflow: "scroll"
  
  
  }))
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
  });



export default function DadosCliente() {
    dayjs.locale(locale_pt)



  const [Dados, setDados] = React.useContext(DadosContext);
  const [showPassword, setshowPassword] = React.useState(false);
  const [Progress, setProgress] = React.useState(0);

  // vcontrole do modal galeria 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const theme = useTheme();


const navegador=useNavigate()

 

  React.useEffect(()=>{
    if(!!!Dados.user){
      navegador("/")
    }
  },[])
  console.log(Dados)
  return (
    <>
    
    <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        padding: 2,
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center"
        }
      }}>

        <Box sx={{ [theme.breakpoints.down("md")]: { mt: 2 }, ml: 2 }}>
          <Avatar sx={{ boxShadow: "inset 2px 5px 10px rgb(5, 5, 5)", width: 120, height: 120 }} src={Dados?.user?.img?.url} alt='image perfil'></Avatar>
        </Box>

        <Paper component={"form"} elevation={1} sx={{ [theme.breakpoints.down("md")]: { mt: 2, ml: 0, flexDirection: "column" }, ml: 5, mt: 7, padding: 2, display: "flex", flexDirection: "row" }} >

          <Box sx={{ margin: 2, [theme.breakpoints.down("md")]: {} }} component={FormControl}>
            <Divider >
              <Chip label="Dados de Acesso"></Chip>
            </Divider>
            <FormLabel>Nome</FormLabel>
            <TextField type='text' value={Dados?.user?.name} onChange={e => {
              e.preventDefault();
              setDados(a => ({ ...a, user: { ...a.user, name: e.target.value } }))
            }} />

            <FormLabel sx={{ mt: 2 }}>E-mail</FormLabel>
            <TextField type='text' value={Dados?.user?.email} onChange={e => {
              e.preventDefault();
              setDados(a => ({ ...a, user: { ...a.user, email: e.target.value } }))
            }} />
            <FormLabel sx={{ mt: 2 }} >Senha</FormLabel>
            <OutlinedInput

              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, password: e.target.value } }))
              }}
              type={showPassword ? 'text' : 'password'}
              value={Dados?.user?.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setshowPassword(a => !a)}
                    onMouseDown={(e) => { e.preventDefault() }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }

            />
          </Box>

          {/* <Box sx={{ margin: 2, [theme.breakpoints.down("md")]: {} }} component={FormControl}>
            <Divider >
              <Chip label="Localização"></Chip>
            </Divider>
            <FormLabel>Cidade</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.cidade}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, cidade: e.target.value } }))
              }}
            />
            <FormLabel sx={{ mt: 2 }}>Bairro</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.bairro}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, bairro: e.target.value } }))
              }}
            />
            <FormLabel sx={{ mt: 2 }}>Endereço</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.endereco}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, endereco: e.target.value } }))
              }}
            />
          </Box> */}

          {/* <Box sx={{ margin: 2, [theme.breakpoints.down("md")]: {} }} component={FormControl}>
            <Divider>
              <Chip label="Dados Pessoais"></Chip>
            </Divider>

            <FormLabel>CPF</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.cpf}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, cpf: e.target.value } }))
              }}
            />


            <FormLabel sx={{ mt: 2 }}>Nascimento</FormLabel>
            <CssTextField

              type='date'
              defaultValue={dayjs(Dados?.user?.nascimento).format("YYYY-MM-DD")}
              onChange={e => {
                e.preventDefault()
                if (!!Dados.user) {
                  setDados(a => ({
                    ...a, user: {
                      ...a.user, nascimento: dayjs(e.target.value)
                    }
                  }))
                }
              }}
            />




            <FormLabel sx={{ mt: 2 }}>Telefone</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.telefone}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, telefone: e.target.value } }))
              }}
            />
          </Box> */}

          {/* <Box sx={{ margin: 2, [theme.breakpoints.down("md")]: {} }} component={FormControl}>
            <Divider>
              <Chip label="Formas de Pagamento"></Chip>
            </Divider>

            <FormLabel>N° Cartão</FormLabel>
            <TextField
              type='text'
              value={
                Dados?.user?.ncart}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, ncart: e.target.value } }))
              }}
            />




            <FormLabel sx={{ mt: 2 }}>Validade</FormLabel>
            <CssTextField
              helperText={"Valido Mês/Ano!"}
              type='date'
              defaultValue={dayjs(Dados?.user?.validadecart).format("YYYY-MM-DD")}
              onChange={e => {
                e.preventDefault()
                if (!!Dados.user) {
                  setDados(a => ({ ...a, user: { ...a.user, validadecart: dayjs(e.target.value) } }))
                }
              }}
            />


            <FormLabel sx={{ mt: 2 }}>CVC</FormLabel>
            <TextField
              type='text'
              value={Dados?.user?.cvc}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, cvc: e.target.value } }))
              }}
            />
          </Box> */}

          {/* botoes */}

          <Box sx={{ [theme.breakpoints.up("sm")]: { ml: 2 } }} component={FormControl}>
            <FormLabel
              sx={{
                padding: 1,
                textAlign: "center",
                cursor: "pointer",
                borderRadius: 1,
                backgroundColor: "#e02141",
                color: theme.palette.getContrastText("#e02141"),
                '&:hover': {
                  opacity: 0.50
                }
              }} htmlFor='foto'
            >
              Carregar Foto
            </FormLabel>
            <input id='foto' hidden accept="image/*" type="file"
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
                // console.log(data)

                if(!!Dados.user){
                  try {
                    api.post(`/users/uploadImage?id_cli=${Dados.user.id}`, data, {
                      onUploadProgress: async e => {
                        let progr = parseInt(Math.round((e.loaded * 100) / e.total));
                        setProgress(a => {
                         if( a>=100){return 0+progr}
                        return a+progr  
                        })
                      }
                    }).then(r => {
  
                      Swal.fire(
                        'Imagem Salva!',
                        '',
                        'success'
                      )
  
  
  
                    })
  
                  } catch (error) {
                    console.log(error)
                    alert("formato nao aceito");
                  }
                }
              }}
            />
            <Button
              sx={{ mt: 2 }}
              variant='contained'
              color='warning'
              onClick={async () => {
                if(!!Dados.user){
                  
                await api.get(`/users/imagesget?id_cli=${Dados.user.id}`).then(r => {
                  if (r.data.status) {
                    setDados(a => ({ ...a, user: { ...a.user, loadedImages: r.data.images } }));
                    handleOpen();

                  }
                })
                }
              }}
            >
              Foto/Galeria
            </Button>

            <Button
              onClick={async () => {
                if(!!Dados.user){
                  await api.put("/update", { ...Dados.user }).then(r => {
                    r.data.status ? alert("Dados atualizados") : alert("Não foi possivel atualizar seus dados entre em contatos com o administrador")
                  })
                }
              }}
              sx={{ mt: 2 }}
              variant='contained'
              color='success'
            >
              Atualizar Dados
            </Button>
            <Button
            disabled
              onClick={
                async () => {
                  if(!!Dados.user){
                    await api.delete("/clientes/delete", { ...Dados.user }).then(r => {
                      r.data.status ? alert("Dados Apagados") : alert("não foi possivel excluir,contacte o administrador")
                      if (r.data.status) { Navigate("/") }
                    })
                  }
                }}
              sx={{ mt: 2, [theme.breakpoints.down("md")]: { mb: 2 } }}
              variant='contained'
              color='error'
            >
              Excluir Conta
            </Button>
          </Box>

          {/* <CircularProgress variant='determinate' value={Progress}></CircularProgress> */}


        </Paper>


        {/* Modal galeria */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <BoxStyle >
            <ImageList sx={{ width: "auto", height: "auto", margin: 2 }} rowHeight={"auto"} cols={4}>
              {Dados?.user?.loadedImages?.map((item) => (
                <ImageListItem sx={{ padding: 1,alignItems:"center" }} key={item.id + uniqueId()}>

                  <img

                    onClick={() => {
                      setDados(a => ({ ...a, user: { ...a.user, id_image: item.id, img: { ...item } } }));
                      alert("É necessário clicar em 'Atualizar Dados' para efetuar de forma permanente esta alteração");
                      handleClose()
                    }}

                    alt={item.name}
                    src={item.url}
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      maxHeight: "10em",
                      maxWidth: "10em",
                      objectFit: "cover",
                      // boxShadow:"inset 2px 5px 10px rgb(5, 5, 5)",
                      boxShadow: "rgba(236, 241, 235, 0.836) 5px 5px, rgba(241, 233, 238, 0.3) 10px 10px, rgba(142, 150, 140, 0.2) 15px 15px, rgba(173, 185, 176, 0.1) 20px 20px, rgba(182, 174, 178, 0.05) 25px 25px"
                      // border:"dashed 1px #f6aa1c"
                    }} />
                  <ImageListItemBar
                  sx={{background:"transparent"}}
                    // title={"Ações:"}
                    // subtitle={item.name}
                    actionIcon={
                      <IconButton
                        sx={{ color: '#e02141',cursor:"pointer",width:theme.spacing(2),width:theme.spacing(2) }}
                        // aria-label={`info about ${item.name}`}

                        onClick={async(e)=>{
                          e.preventDefault();
                          await axios.delete(item.delete).then(r=>{
                            console.log(r.data)
                            if(r.data.status){
                              setDados(a=>({...a,user:{...a.user,loadedImages:[...a.user.loadedImages.filter(i=>(i.id!=item.id))]}}))
                            }
                          })

                        }}
                        
                      >
                        <Delete />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </BoxStyle>
        </Modal>

      </Box></>
  );
}
