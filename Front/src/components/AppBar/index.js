import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { BsFacebook, BsInstagram, BsWhatsapp,BsArrowDownLeftSquare } from "react-icons/bs";




import cant from "../../assets/CANTINHO DA LORA.png"

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
    <Box >

      <AppBar position="static" sx={{
          background: "#ebebeb",
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
            // sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}

          >
            <MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("http://www.instagran.com/cantinho_dalora"); handleClose2() }}><BsInstagram></BsInstagram>Instagran</MenuItem>
            <MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("https://www.facebook.com/cantinhodalora"); handleClose2() }}><BsFacebook></BsFacebook>Facebook</MenuItem>
            <MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { window.open("https://api.whatsapp.com/send?phone=+5596981325410&text=Oi"); handleClose2() }}><BsWhatsapp></BsWhatsapp>Whatsap</MenuItem>
            <MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "150px" }} onClick={() => { navegator("/login") }}><BsArrowDownLeftSquare></BsArrowDownLeftSquare>Login/Entrar</MenuItem>
           


          </Menu>




        </Toolbar>
        
     
      </AppBar>
    </Box>
  );
}
