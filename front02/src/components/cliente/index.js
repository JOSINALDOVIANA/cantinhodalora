import * as React from 'react';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { DadosContext } from '../../routs';
import MenuAppBar from '../AppBar';
import { Chip, CssBaseline, Divider, FormControl, FormLabel, ImageList, ImageListItem, InputAdornment, Link, Modal, OutlinedInput, Paper, TextField, styled, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { api } from '../../api';
import { Navigate } from 'react-router-dom';
import { uniqueId } from 'lodash';
import Swal from 'sweetalert2';

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

function TelaCliente() {



  const [Dados, setDados] = React.useContext(DadosContext);
  const [showPassword, setshowPassword] = React.useState(false);

  // vcontrole do modal galeria 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const theme = useTheme();
  console.log(Dados)

  return (
    <>
      <CssBaseline />
      <MenuAppBar></MenuAppBar>
      <Box sx={{ display: "flex", padding: 2, [theme.breakpoints.down("md")]: { flexDirection: "column", alignItems: "center" } }}>

        <Box sx={{ [theme.breakpoints.down("md")]: { mt: 2 }, ml: 2 }}>
          <Avatar sx={{ boxShadow: "inset 2px 5px 10px rgb(5, 5, 5)", width: 120, height: 120 }} src={Dados?.user?.img?.url} alt='image perfil'></Avatar>
        </Box>

        <Paper elevation={1} sx={{ [theme.breakpoints.down("md")]: { mt: 2, ml: 0, flexDirection: "column" }, ml: 5, mt: 7, padding: 2, display: "flex", flexDirection: "row" }} >

          <Box sx={{margin:2,[theme.breakpoints.down("md")]:{}}} component={FormControl}>
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

          <Box sx={{margin:2,[theme.breakpoints.down("md")]:{}}} component={FormControl}>
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
          </Box>

          <Box sx={{margin:2,[theme.breakpoints.down("md")]:{}}} component={FormControl}>
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
            <TextField
              type='text'
              value={new Date(Dados?.user?.nasciento).toDateString()}
              onChange={e => {
                e.preventDefault();
                setDados(a => ({ ...a, user: { ...a.user, nascimento: e.target.value } }))
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
          </Box>

          <Box component={FormControl}>
          <FormLabel   
          sx={{
            padding:2,
            textAlign:"center",
            cursor:"pointer", 
            borderRadius:1,
            backgroundColor:"#e02141",
            '&:hover':{
              opacity:0.50
            }
            }} htmlFor='foto'>Carregar Foto</FormLabel>
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

              try {
                api.post(`/uploadImage?id_cli=${Dados.user.id}`, data, {
                  onUploadProgress: e => {
                    let progr = parseInt(Math.round((e.loaded * 100) / e.total));
                    // setProgress(a => a + progr)
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
            }}
          />
          <Button 
          sx={{mt:2}} 
          variant='contained' 
          color='warning' 
          onClick={async ()=>{
            
            await api.get(`/imagesget?id_cli=${Dados.user.id}`).then(r=>{
              if(r.data.status){
                setDados(a=>({...a,user:{...a.user,loadedImages:r.data.images}}));
                handleOpen();
              
              }
            })

          }}
          >
            Foto/Galeria
            </Button>
          
          <Button 
          onClick={async ()=>{
           await api.put("/clientes/update",{...Dados.user}).then(r=>{
              r.data.status?alert("Dados atualizados"):alert("Não foi possivel atualizar seus dados entre em contatos com o administrador")
            })
          }} 
          sx={{ mt: 2 }} 
          variant='contained' 
          color='success'
          >
            Atualizar Dados
            </Button>
          <Button 
          onClick={
            async ()=>{
            await  api.delete("/clientes/delete",{...Dados.user}).then(r=>{
              r.data.status?alert("Dados Apagados"):alert("não foi possivel excluir,contacte o administrador")
              if(r.data.status){Navigate("/")}
            })
          }}
          sx={{ mt: 2, [theme.breakpoints.down("md")]: { mb: 2 } }} 
          variant='contained' 
          color='error'
          >
            Excluir Conta
            </Button>
          </Box>


        </Paper>


{/* Modal galeria */}
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxStyle >


          <ImageList sx={{ width: "auto", height: "auto", marginTop: 2 }} rowHeight={"auto"} cols={4}>
            {Dados?.user?.loadedImages?.map((item) => (
              <ImageListItem sx={{ padding: 2 }} key={item.id + uniqueId()}>
                
                <img
                  onClick={() => { setDados(a=>({...a,user:{...a.user,id_image:item.id,img:{...item}}}))}}

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



    </>
  );
}
export default TelaCliente;