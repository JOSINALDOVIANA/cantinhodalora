import { Box, Chip, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { uniqueId } from 'lodash';
import dayjs from 'dayjs';
import locale_pt from 'dayjs/locale/pt-br'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RecipeReviewCard from './cards';

// import { Container } from './styles';


function ListeClientes() {
    dayjs.locale(locale_pt)
    const theme = useTheme()
    const [clientes, setClientes] = useState([])
    const [showPassword, setshowPassword] = React.useState(false);
    useEffect(() => {
        const carregar = async () => {
            await api.get('/getclientes').then(r => {
                if (r.data.status) {
                    setClientes(r.data.user)
                }
            })
        }
        carregar()
    }, [])
    console.log(clientes)
    return (
        
            <Grid 
            // sx={{position:"relative"}} 
            container 
            justifyContent={"center"} 
            // alignItems="center" 
            spacing={1} >
            {clientes?.map((item, index) => (
                    <Grid
                    // maxWidth={300}
                        key={item.id + uniqueId()}
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={2}
                    >
                        <RecipeReviewCard setClientes={setClientes} user={item}></RecipeReviewCard>

                    </Grid>
                
                ))}
                </Grid>

        
    );
}

export default ListeClientes;