import { Avatar, Box, Button, Divider, Grid, ImageList, ImageListItem, Modal, Paper, TextField, Typography, styled } from '@mui/material';
import React from 'react';
import { api, url } from '../../../api';
import { uniqueId } from 'lodash';
import {TfiClose,TfiUpload,TfiWrite,TfiAlignJustify, TfiShiftLeft, TfiCloudUp} from  "react-icons/tfi";
import "./styleeditar.css";
import Swal from 'sweetalert2';
import { useOutletContext } from 'react-router-dom';

// import { Container } from './styles';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function Produtosedit() {

  const [dados] = useOutletContext();
  const [produtos, setProd] = React.useState([]);
  const [selectprod, setSelectP] = React.useState({ index: "", id: "", prod: {} });
  const [imagens, setIMG] = React.useState([])
  const [logos, setL] = React.useState([])
  const [categorias, setCatgorias] = React.useState([])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openL, setOpenL] = React.useState(false);
  const handleOpenL = () => setOpenL(true);
  const handleCloseL = () => setOpenL(false);

  const [openE, setOpenE] = React.useState(false);
  const handleOpenE = () => setOpenE(true);
  const handleCloseE = () => setOpenE(false);

  const [openC, setOpenC] = React.useState(false);
  const handleOpenC = () => setOpenC(true);
  const handleCloseC = () => setOpenC(false);



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

  React.useEffect(() => {
    api.get("/categorias").then(r => {
      setCatgorias(r.data.categorias)
    })
  }, [])

  console.log(dados)
  return (
    <div className='p-1'>
      <Grid container alignItems="center" spacing={2}>
        {produtos?.map((p,index) => (
          <Grid key={p.id + "prod"} item xs={6} sm={4} md={3} lg={3}>


            <Paper

              elevation={4}
              sx={{
                display: "flex",
                borderRadius: 1,
                flexDirection: "column",
                fontFamily: "Roboto",
                alignItems: "center"

              }}
              className='card'
              onClick={() => {

              }}

            >





              <Img onClick={() => { setSelectP({ id: p.id, index, prod:p }); handleOpen() }} alt={p.desc} src={p.url} sx={{ borderRadius: 0, width: 100, height: 100, margin: 2 }} />
              <Paper  
              onClick={()=>{
                setSelectP({ id: p.id, index, prod:p }); setL(p.logos); handleOpenL()
              }}
              elevation={0} sx={{background:"transparent",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:1}}>
                {p.logos.map(item=>(<Avatar  key={item.id} src={item.url} alt={item.desc}></Avatar>))}
              </Paper>
              <Typography>{p.desc+" "+p.tam}</Typography>

           

              

              <Divider color="#000" sx={{ width: "90%" }} ></Divider>


              <div className="container text-center mb-1 mt-1">
                <div className="row g-2">
                  <div onClick={() => { api.delete(`/produtos?id=${p.id}`).then(r=>{
                    if(r.data.status){
                      let pr=produtos.filter(item=>item.id!=p.id)

                      setProd(pr);
                    }
                    }) }} className="col-6 caixa">
                    <TfiClose color='#e02141' size={20}></TfiClose>
                  </div>
                  <div onClick={() => { setSelectP({ id: p.id, index, prod:p }); setL(p.logos); handleOpenE() }} className="col-6 caixa">
                    <TfiWrite color="#04B431" size={20}></TfiWrite>
                  </div>
                  <div onClick={(e)=>{
                  e.preventDefault();
                  setSelectP({ id: p.id, index, prod:p })
                  handleOpenC()
                  }} className="col-6 caixa">
                    <TfiAlignJustify color="#04B431" size={20}></TfiAlignJustify>
                  </div>

                  <div onClick={(e)=>{
                  e.preventDefault();
                  let prod=p;
                  prod.cat=prod.cat.map(c=>(c.id))
                  prod.logos=prod.logos.map(l=>(`${l.id}`))
                  api.put(`/produtos`,{...prod}).then(r=>{
                    if(r.data.status){
                      Swal.fire(
                        'Atualizado!',
                        '',
                        'success'
                      )
                    }else{
                      alert("error")
                    }
                  })
                  }} className="col-6 caixa">
                    <TfiCloudUp color="#04B431" size={20}></TfiCloudUp>
                  </div>
                  
                </div>
              </div>




            </Paper>
          </Grid>
        ))}

      </Grid>
      {/* <table className="table ">
        <thead className="thead-ligth">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Descrição</th>
            <th scope="col">Tamanho</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor</th>
            <th scope="col">Imagem</th>
            <th scope="col">Logos</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((prod, index) => (
            <tr key={prod.id + uniqueId()}>
              <th scope="row">{prod.id}</th>
              <td onClick={() => { setSelectP({ id: prod.id, index, prod }); setL(prod.logos); handleOpenE() }} >{prod.desc}</td>
              <td onClick={() => { setSelectP({ id: prod.id, index, prod }); setL(prod.logos); handleOpenE() }}>{prod.tam}</td>
              <td onClick={() => { setSelectP({ id: prod.id, index, prod }); setL(prod.logos); handleOpenE() }}>{prod.und}</td>
              <td onClick={() => { setSelectP({ id: prod.id, index, prod }); setL(prod.logos); handleOpenE() }}>{prod.preco}</td>
              <td onClick={() => { setSelectP({ id: prod.id, index, prod }); handleOpen() }}><Avatar src={prod.url} alt={prod.desc} ></Avatar></td>
              <td onClick={() => { setSelectP({ id: prod.id, index, prod }); setL(prod.logos); handleOpenL() }}><div style={{ display: "flex", justifyContent: "space-around" }}>{prod?.logos?.map(l => (<Avatar key={l.id + uniqueId()} src={l.url} alt={l.name} ></Avatar>))}</div></td>

              <td>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button color='error'
                variant='contained' >Excluir</Button>
                <Button 
                color='success'
                variant='contained'
                onClick={(e)=>{
                  e.preventDefault();
                  let p=prod;
                  p.cat=p.cat.map(c=>(c.id))
                  p.logos=p.logos.map(l=>(`${l.id}`))
                  api.put(`/produtos`,{...p}).then(r=>{
                    if(r.data.status){
                      Swal.fire(
                        'Atualizado!',
                        '',
                        'success'
                      )
                    }else{
                      alert("error")
                    }
                  })
                  }}>Salvar</Button>
                <Button 
                color='success'
                variant='contained'
                onClick={(e)=>{
                  e.preventDefault();
                  setSelectP({ id: prod.id, index, prod })
                  handleOpenC()
                  }}>Categorias</Button>
                </div>
                </td>
            </tr>
          ))}

        </tbody>
      </table> */}

      {/* -----MOdal para produtos---- */}
      <Modal
        open={open}
        onClose={() => {
          handleClose()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>


          <ImageList sx={{ width: 500, height: 450, marginTop: 2, background: "#fff" }} cols={3} rowHeight={164}>
            {imagens.map((item) => (
              <ImageListItem sx={{ padding: 2 }} key={item.id + uniqueId()}>
                <img
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  onClick={() => {
                    let p1 = produtos[selectprod.index];
                    p1.img = item;
                    p1.url = item.url;
                    p1.id_image = item.id
                    let p = produtos;
                    p[selectprod.index] = { ...p1 }
                    setProd(p)
                  }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>

      {/* -----Modal para Logos------ */}
      <Modal
        open={openL}
        onClose={() => {
          
          
          setProd(a=>{
            let allProd = a;
            allProd[selectprod.index] = { ...allProd[selectprod.index], logos }
            return([...allProd])
          })
          handleCloseL()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Paper elevation={0} sx={{ display: "flex", justifyContent: "space-around", height: "30px" }}>
            {logos?.map((item, ind) => (
              <img
                key={ind + item.id + item.key + "-" + uniqueId()}
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                onClick={() => {
                  setL(a => (a.filter(i => i.id != item.id)))
                }}
                loading="lazy"
              />
            ))}
          </Paper>
          <ImageList sx={{ width: 500, height: 450, marginTop: 2, background: "#fff" }} cols={3} rowHeight={164}>
            {imagens.map((item) => (
              <ImageListItem sx={{ padding: 2 }} key={item.id + uniqueId()}>
                <img
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  onClick={() => {
                    setL(a => ([...a, { ...item }]))
                  }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>

      {/* -----Modal Edit---- */}
      <Modal
        open={openE}
        onClose={() => {
          let prs = produtos;
          prs[selectprod.index] = selectprod.prod
          setProd(prs)
          handleCloseE()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <TextField sx={{ marginBottom: 1 }}
            value={selectprod.prod.desc}
            onChange={(e) => setSelectP(a => ({ ...a, prod: { ...a.prod, desc: e.target.value } }))}
            type="text" label="Descrição"
          ></TextField>

          <TextField sx={{ marginBottom: 1 }}
            value={selectprod.prod.tam}
            onChange={(e) => setSelectP(a => ({ ...a, prod: { ...a.prod, tam: e.target.value } }))}
            type="text" label="Tamanho"></TextField>

          <TextField sx={{ marginBottom: 1 }}
            value={selectprod.prod.preco}
            onChange={(e) => setSelectP(a => ({ ...a, prod: { ...a.prod, preco: e.target.value } }))}
            type="number" label="Preço/UND"></TextField>
          <TextField sx={{ marginBottom: 1 }}
            value={selectprod.prod.und}
            onChange={(e) => setSelectP(a => ({ ...a, prod: { ...a.prod, und: e.target.value } }))}
            type="number" label="Preço/UND"></TextField>



        </Box>
      </Modal>
      {/* Modal categorias */}
      <Modal
        open={openC}
        onClose={() => {
          let prs = produtos;
          prs[selectprod.index] = selectprod.prod
          setProd(prs)
          handleCloseC()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Box>
            <Typography>
              Cadastrada
            </Typography>
            {
              selectprod?.prod?.cat?.map(cat => (<Button onClick={() => {
                let c = selectprod.prod.cat;
                c = c.filter(i => i.id != cat.id)
                setSelectP(a => ({ ...a, prod: { ...a.prod, cat: c } }))
              }}>{cat.desc}</Button>))
            }
          </Box>
          <Box>
            <Typography>
              Todas
            </Typography>
            {categorias.map(cat => (
              <Button onClick={() => {
                setSelectP(a => ({ ...a, prod: { ...a.prod, cat: [...a.prod.cat, { ...cat }] } }))
              }}>{cat.desc}</Button>
            ))}
          </Box>

          {/* <TextField sx={{ marginBottom: 1 }}
            value={selectprod.prod.desc}
            onChange={(e) => setSelectP(a => ({ ...a, prod:{...a.prod,desc:e.target.value} }))}
            type="text" label="Descrição"
          ></TextField>

          <TextField sx={{ marginBottom: 1 }}
            value={selectprod.prod.tam}
            onChange={(e) => setSelectP(a => ({ ...a, prod:{...a.prod,tam:e.target.value} }))}
            type="text" label="Tamanho"></TextField>

          <TextField sx={{ marginBottom: 1 }}
            value={selectprod.prod.preco}
            onChange={(e) => setSelectP(a => ({ ...a, prod:{...a.prod,preco:e.target.value} }))}
            type="number" label="Preço/UND"></TextField>
          <TextField sx={{ marginBottom: 1 }}
            value={selectprod.prod.und}
            onChange={(e) => setSelectP(a => ({ ...a, prod:{...a.prod,und:e.target.value} }))}
            type="number" label="Preço/UND"></TextField> */}



        </Box>
      </Modal>

    </div>
  );
}

export default Produtosedit;