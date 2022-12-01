import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { uniqueId } from 'lodash'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import Button from '@mui/material/Button';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import cant from "../../assets/CANTINHO DA LORA.png"
import { api } from '../../api';
export default function MenuAppBar(prop) {

  const navegator = useNavigate();






  const [anchorE2, setAnchorE2] = React.useState(null);




  const handleMenu2 = (event) => {
    setAnchorE2(event.currentTarget);
  };



  const handleClose2 = () => {
    setAnchorE2(null);
  };

  return (
    <Box sx={{ flexGrow: 1, }}>

      <AppBar position="static" sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: 0,
        textAlign: "center",
        padding: 1,

      }}>
        <Toolbar sx={{
          display: "flex",
          justifyContent: "space-between"
        }}>


          <img
            src={`${cant}`}
            alt="logo"
            loading="lazy"
            style={{ width: "15%" }}
          />
          <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" 
           onChange={(ee) => {


            const files = ee.target.files;
            let uploadedFiles = []
            console.log(files)

            for (const iterator of files) {

              uploadedFiles.push(
                {
                  "file": iterator,
                  "id": uniqueId(),//definindo um id unico 
                  "name": iterator.name,
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
              api.post(`/uploadImage`, data, {
                // onUploadProgress: e => {
                //   let progress = parseInt(Math.round((e.loaded * 100) / e.total));
                //   setProgress(a => a + progress)
                // }
              }).then(r => {

                alert("imagem salva");
                document.location.reload()



              })

            } catch (error) {

            }
          }}
          />
          <PhotoCamera />
        </IconButton>

          <IconButton
            size="large"
            edge="start"
            color='inherit'
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu2}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorE2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorE2)}
            onClose={handleClose2}

          >
            <MenuItem sx={{ display: "flex", justifyContent: "space-around", width: "150px" }} onClick={() => { window.open("http://www.instagran.com/cantinho_dalora"); handleClose2() }}><BsInstagram></BsInstagram>Instagran</MenuItem>
            <MenuItem sx={{ display: "flex", justifyContent: "space-around", width: "150px" }} onClick={() => { window.open("https://www.facebook.com/cantinhodalora"); handleClose2() }}><BsFacebook></BsFacebook>Facebook</MenuItem>
            <MenuItem sx={{ display: "flex", justifyContent: "space-around", width: "150px" }} onClick={() => { window.open("https://api.whatsapp.com/send?phone=+5596981325410&text=Oi"); handleClose2() }}><BsWhatsapp></BsWhatsapp>Whatsap</MenuItem>
            <MenuItem sx={{ display: "flex", justifyContent: "space-around", width: "150px" }} onClick={() => { navegator("/login") }}>Login</MenuItem>


          </Menu>




        </Toolbar>
        
     
      </AppBar>
    </Box>
  );
}
