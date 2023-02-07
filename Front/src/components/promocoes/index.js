import React from 'react';
import { Paper, Typography, styled, useTheme } from '@mui/material';
import Torre from "../../assets/Torres.png"
// import { Container } from './styles';
const Img = styled('img')({

    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
function Promo() {
    const theme=useTheme();
    return (
        <Paper
            sx={{
                flexGrow: 1,
                height: "auto",
                borderRadius: 1,
                overflow: "scroll",
                // background: "#ebebeb",
                color: "#000",
                display: "flex",
                alignItems: "center",
                margin: 2

            }}
            elevation={0}
        >
            <Img classNameName='img' alt="torre"
                sx={{
                    marginTop: theme.spacing(2),
                    width: theme.spacing(30),
                    height: theme.spacing(20)
                }}
                src={Torre}></Img>

            <Typography variant='p' component="h1"
                sx={{
                    fontFamily: "Oswald",
                    textAlign: "justify",

                    fontWeight: "100"

                }} >
                Promoção do dia, Na Compra de duas torres de R$55,00 ganhe uma caipirinha.
            </Typography>
        </Paper>
    );
}

export default Promo;