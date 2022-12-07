import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const pages = ['Produtos', 'Imagens',"Dados", 'Sair'];


function ResponsiveAppBar(props) {
 const navegate=useNavigate();



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
       
          {/* --------------------EM TELA PEQUENA------------- */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          

{/* -----------------------EM TELA GRANDE--------------------- */}
          <Box sx={{ flexGrow: 1,
            //  display: { xs: 'none', md: 'flex' }
              }}>
            {pages.map((page,index) => (
              <Button
                key={page}
                onClick={()=>{
                 if(page=="Imagens"){navegate("/perfil/imagens",{state:props.user})}
                 if(page=="Dados"){navegate("/perfil/userEdit",{state:props.user})}
                 if(page=="Sair"){navegate("/")}
                }}
                sx={{ my: 2, color: 'white' }}
              >
                {page}
              </Button>
            ))}
          </Box>

         
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;