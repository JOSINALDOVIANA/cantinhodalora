import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Badge, Box, Chip, useTheme } from '@mui/material';
import { red, green } from '@mui/material/colors';



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});



export default function ComplexGrid({ img, desc, tamanho, valor, logos, bg, id,und }) {
    const theme=useTheme();
    
    return (

        <Paper

            elevation={2}
            sx={{
                display: "flex",
                borderRadius: 0,
                flexDirection: "column",
                fontFamily: "Roboto",
                alignItems: "center",
                position: "relative"


            }}
            className='card'
            onClick={() => {
                if (logos.length > 0) {

                    if (window.getComputedStyle(document.getElementById(id), null).display == "none") {

                        document.getElementById(id).style.display = "flex"
                        return
                    }
                    if (window.getComputedStyle(document.getElementById(id), null).display == "flex") {

                        document.getElementById(id).style.display = "none"
                        return
                    }

                }
            }}

        >



        <Badge sx={{right:25,top:15,position:"absolute"}} badgeContent={und} color={"success"} max={999} >
                
            </Badge>

            <Img alt={desc} src={img} sx={{ borderRadius: 0, width: 100, height: 100, margin: 2 }} />
            <Divider sx={{ margin: 1, marginTop: 2, width: "90%" }}>
                <Chip label="Informações" />
            </Divider>
            {/* {logos.length > 0 && <Divider color="#000" sx={{ width: "90%" }} ></Divider>} */}
            {logos.length > 0 && (

                <Box id={id} sx={{ display: "none", maxWidth: "130px", justifyContent: "space-around", margin: 1 }}>

                    {logos.map(logo => (<Img key={logo.id} alt='imagem' src={logo.url} sx={{ height: "30%", width: "30%" }}></Img>))}
                </Box>

            )}

            {/* <Divider color="#000" sx={{ width: "90%" }} ></Divider> */}


            {logos.length > 0 ? <Typography noWrap sx={{ fontSize: "0.6em", fontFamily: "Roboto", "&:hover": { cursor: "pointer" } }} color={red[600]}>CLIQUE PARA OPÇÕES</Typography> : ""}


            <Box sx={{ flexDirection: "column", width: "100%", padding: 2 }}>

                {bg ? null : <Typography sx={{ fontSize: "1.5em", fontFamily: "Roboto", fontWeight: 300, textAlign: "initial", marginTop: 2, color: "#050A30" }} variant="subtitle1" component="div">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(valor)}
                </Typography>}

                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ color: "#404E5C", fontSize: "0.9em" }} noWrap variant="subtitle1" component="p">
                        {desc} {tamanho}
                    </Typography>
                    <Typography sx={{ fontSize: "0.7em" }} color={green[500]} noWrap gutterBottom variant="subtitle1" component="div">
                        OBS: Verifique a disponibilidade
                    </Typography>



                </Box>




            </Box>




        </Paper>
    );
}
