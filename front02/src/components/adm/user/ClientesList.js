import { Box, Chip, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { api } from '../../../api';
import { uniqueId } from 'lodash';
import dayjs from 'dayjs';
import locale_pt from 'dayjs/locale/pt-br'
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
        <Box
            sx={{
                // background:"#e02141",
                display: "flex",
                flexDirection: "row",
                padding: theme.spacing(1),
                justifyContent: "space-evenly",
                alignItems: "center",
                // maxHeight:"100%",
                overflow: "scroll",
                [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "stretch"

                },
            }}
        >
            {clientes?.map((item, index) => (
                <Box
                    key={uniqueId()}
                    sx={{
                        mb: 1,
                        padding: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        overflow: "scroll",
                        [theme.breakpoints.down("md")]: {
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }
                    }}
                    component={Paper}
                >
                    <Box onSubmit={e => { e.preventDefault() }} component={"form"}>
                        <FormControl>
                            <Divider sx={{ mb: 2, mt: 2 }}>
                                <Chip label="Dados pessoais"></Chip>
                            </Divider>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="Nome"
                                name='nome'
                                type='text'
                                placeholder={item.name}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                InputLabelProps={{ shrink: true }}
                                label="CPF"
                                name='cpf'
                                type='text'
                                placeholder={item.cpf}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                InputLabelProps={{ shrink: true }}
                                label="Telefone"
                                name='telefone'
                                type='text'
                                placeholder={item.telefone}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                label="Nascimento"
                                name='nascimento'
                                type='date'
                                defaultValue={dayjs(item.nascimento).format("YYYY-MM-DD")}
                            />
                            <Divider sx={{ mb: 2, mt: 2 }} >
                                <Chip label="Dados de Acesso"></Chip>
                            </Divider>

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="E-mail"
                                name='email'
                                type='text'
                                placeholder={item.email}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                InputLabelProps={{ shrink: true }}
                                label="Telefone"
                                name='telefone'
                                type='text'
                                placeholder={item.telefone}
                            />

                            {/* <InputLabel htmlFor="password">Senha</InputLabel> */}
                            <OutlinedInput
                                sx={{ mt: 2 }}
                                InputLabelProps={{ shrink: true }}
                                id='password'
                                label="Senha"
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder={item?.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setshowPassword(a => !a)}
                                            onMouseDown={(e) => { e.preventDefault() }}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                            <Divider sx={{ mb: 2,mt:2 }} >
                                <Chip label="Localização"></Chip>
                            </Divider>
                            <TextField 
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                    mt: 2
                                }} 
                                name='cidade' 
                                label="Cidade" 
                                type='text' 
                                placeholder={item?.cidade} 
                                />
                            <TextField 
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                mt: 2
                            }}
                            name='bairro' 
                            label="Bairro" 
                            type='text' 
                            placeholder={item?.bairro} 
                            />
                            <TextField
                            InputLabelProps={{ shrink: true }} 
                            sx={{
                                mt: 2
                            }}
                            name='endereco' 
                            label="Endereço" 
                            type='text' 
                            placeholder={item?.endereco} 
                            />



                        </FormControl>
                    </Box>


                </Box>
            ))}

        </Box>
    );
}

export default ListeClientes;