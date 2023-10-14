import React, { useEffect, useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import { api } from '../../../api';
import { uniqueId } from 'lodash';
import dayjs from 'dayjs';
import locale_pt from 'dayjs/locale/pt-br'

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
            // sx={{mb:3}} 
            container 
            justifyContent={"center"} 
            // alignItems="center" 
            spacing={1} >
            {clientes?.map((item, index) => (
                    <Grid
                    minHeight={300}
                        key={item.id + uniqueId()}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <RecipeReviewCard setClientes={setClientes} user={item}></RecipeReviewCard>

                    </Grid>
                
                ))}
                </Grid>

        
    );
}

export default ListeClientes;