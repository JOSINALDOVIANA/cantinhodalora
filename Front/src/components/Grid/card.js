import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box, useTheme } from '@mui/material';



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function ComplexGrid({ img, desc, tamanho, valor, logos, bg }) {
   
    return (

        <Paper

            elevation={5}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: '#fff',                
                borderRadius: 1,
                fontFamily: "Roboto"
            }}
        >


            <Box>

                <Img alt={desc} src={img} sx={{ borderRadius: 0, width: 130, height: 130 }} />

            </Box>


            <Box sx={{  flexGrow:1, padding: 1,flexDirection:"column",textAlign:"end" }}>

                <Box sx={{ flexGrow:1,flexDirection: "column", alignItems: "center" ,justifyContent:"center",textAlign:"end" }}>
                    <Typography sx={{ color:"#000"}} gutterBottom variant="subtitle1" component="div">
                        {desc} {tamanho}
                    </Typography>

                    {logos.length > 0 && (
                        <Box sx={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center" }}>
                            <Typography sx={{ fontWeight: "bold", fontSize: 10, marginBottom: 0 }} variant="body2" gutterBottom>
                                Opções Disponiveis:
                            </Typography>
                            <Box sx={{ display: "flex", maxWidth:"130px",  justifyContent: "space-around" }}>

                                {logos.map(logo => (<Img alt='imagem' src={logo} sx={{ height: "40%", width: "40%" }}></Img>))}
                            </Box>
                        </Box>
                    )}

                </Box>



                {bg ? null : <Typography sx={{  bottom: 2, right: 5, color: "red", fontWeight: "bold" }} variant="subtitle1" component="div">
                    {"R$ " + valor}
                </Typography>}
            </Box>




        </Paper>
    );
}
