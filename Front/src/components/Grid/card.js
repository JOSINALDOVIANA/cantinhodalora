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

export default function ComplexGrid({img,desc,tamanho,valor,logos,bg}) {
    const theme=useTheme();
    return (
       
        <Paper
        
        elevation={5}
        sx={{ 
        display: "flex",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor: (theme) =>theme.palette.mode === 'dark' ? '#33605a' : '#fff',   
       position: "relative",
       borderRadius:1,
       fontFamily:"Roboto"
        }}
        >


                <Box>
                    
                        <Img  alt={desc} src={img} sx={{ borderRadius:0,width:130,height:130 }} />
                    
                </Box>
                
                
                <Box sx={{display:"flex",padding:1}}>

                    <Box sx={{ display: "flex", flexDirection: "column",alignItems:"center"}}>
                        <Typography  sx={{fontWeight:"bold",textAlign:"center",maxWidth:300}} gutterBottom variant="subtitle1" component="div">
                            {desc} {tamanho} 
                        </Typography>

                       {logos.length>0 && (
                       <Box sx={{ display: "flex", flexDirection: "column"}}>
                        <Typography sx={{fontWeight:"bold",fontSize:10,marginBottom:0}}  variant="body2" gutterBottom>
                            Opções Disponiveis:
                            </Typography>
                            <Box sx={{ display: "flex",maxWidth:150, justifyContent: "space-evenly",marginBottom:2 }}>

                            {logos.map(logo=>( <Img alt='imagem' src={logo} sx={{ height: "40%", width: "40%" }}></Img>))}
                            </Box>
                       </Box>
                       )}
                        
                    </Box>



                    {bg?null:<Typography sx={{ position: "absolute", bottom:2, right: 5,color:"red",fontWeight:"bold" }} variant="subtitle1" component="div">
                        {"R$ "+valor}
                    </Typography>}
                </Box>




            </Paper>
    );
}
