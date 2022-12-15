import PhotoCamera from '@mui/icons-material/PhotoCamera.js';
import { Avatar, Box, Button, IconButton, ImageList, ImageListItem, TextField,Typography , Modal} from '@mui/material';
import { uniqueId } from 'lodash';
import React from 'react';
import { api, url } from '../../../api.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Produtoscad() {
  const [produto, setProduto] = React.useState({ desc: '', tam: '',logos:[], preco: 0, url: '', und: 0, id_image: '' })
  const [imagens, setIMG] = React.useState([])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
  }, [])
  console.log(produto)
  return (



    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
      <Box sx={{ border: "2px solid #dddddd", borderRadius: "3px", boxShadow: " 1px 1px 1px 1px  ", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", marginTop: 2 }}>
        {!!produto.url && <Avatar sx={{ width: 56, height: 56, marginBottom: 5 }} src={produto.url} alt='imagem produto'></Avatar>}

        <TextField sx={{ marginBottom: 1 }}
          value={produto.desc}
          onChange={(e) => setProduto(a => ({ ...a, desc: e.target.value }))}
          type="text" label="Descrição"
        ></TextField>

        <TextField sx={{ marginBottom: 1 }}
          value={produto.tam}
          onChange={(e) => setProduto(a => ({ ...a, tam: e.target.value }))}
          type="text" label="Tamanho"></TextField>

        <TextField sx={{ marginBottom: 1 }}
          value={produto.preco}
          onChange={(e) => setProduto(a => ({ ...a, preco: e.target.value }))}
          type="number" label="Preço/UND"></TextField>

        <TextField sx={{ marginBottom: 1 }}
          value={produto.und}
          onChange={(e) => setProduto(a => ({ ...a, und: e.target.value }))}
          type="number" label="Quantidade/UND"></TextField>



        <Button onClick={async () => {
          api.post("/produtos", { ...produto }).then(r => {
            // console.log(r.data)
            if (r.data.status) { alert(r.data.mensagem) }
            else { alert(r.data.mensagem) }
          })
        }} variant="contained" color="success">Salvar</Button>

<Button onClick={handleOpen}>Escolher logos</Button>

      </Box>
      <Box sx={{ width: "50%" }}>
        <ImageList sx={{ width: "100%", height: "400px", marginTop: 2 }} cols={3} rowHeight={164}>
          {imagens.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
                onClick={() => { setProduto(a => ({ ...a, id_image: item.id, url: item.url })) }}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file"
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

              // SETANDO O LOCAL ONDE APARECE IMAGEM 
              // document.getElementById("imgtroc1").setAttribute("src", uploadedFiles[0].preview);
              // document.getElementById("imgtroc").setAttribute("src", uploadedFiles[0].preview);
              // document.getElementById("imgheader").setAttribute("src", uploadedFiles[0].preview);

              // DELETANDO:
              // try {
              //   api.delete(`/images/deletar?key=${values?.image?.key}&id=${values?.image?.id}`).then(r => {
              //     // console.log(r)
              //   });
              // } catch (error) {

              // }

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

                  alert("imagem salva");
                  document.location.reload()



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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ImageList sx={{ width: "100%", height: "400px", marginTop: 2 }} cols={3} rowHeight={164}>
          {imagens.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
                onClick={() => { setProduto(a => ({ ...a, logos: [...a.logos,item.id] })) }}
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