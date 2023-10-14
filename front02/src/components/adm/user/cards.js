import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import dayjs from 'dayjs';
import locale_pt from 'dayjs/locale/pt-br'
import { Box, Button, Chip, Divider, FormControl, Input, InputAdornment, InputLabel,  TextField } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { api } from '../../../api';
import Swal from 'sweetalert2';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ user, setClientes }) {
    dayjs.locale(locale_pt);
    const [expanded, setExpanded] = React.useState(false);
    const [userInterno, setUserinterno] = React.useState({ ...user });
    const [showPassword, setshowPassword] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // const theme = useTheme()

    return (
        <Card elevation={5} sx={{
            mt: 2,
            minHeight: 300
            // position:"absolute"
        }}>
            <CardHeader
                avatar={
                    <Avatar src={userInterno?.img?.url} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {userInterno?.name[0]}
                    </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={userInterno?.name}
                subheader={"Cliente Desde: " + dayjs(userInterno?.updatedAt).format("ddd, D  MMM  YYYY")}
            />
            {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
            <CardContent sx={{ display: "flex", alignItems: "initial", justifyContent: "space-evenly" }}>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "initial", width: "50%", "&&": { mr: 2 } }}>
                    <Box>
                        <Typography sx={{ fontSize: "0.7rem" }} component={"span"}>CIDADE:</Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: green[500] }} >{userInterno?.cidade.toUpperCase()}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "0.7rem" }} component={"span"}>BAIRRO:</Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: green[500] }} >{userInterno?.bairro.toUpperCase()}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "0.7rem" }} component={"span"}>ENDEREÇO: </Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: green[500] }} >{userInterno?.endereco.toUpperCase()}</Typography>
                    </Box>

                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "initial", width: "50%" }}>
                    <Box>
                        <Typography sx={{ fontSize: "0.7rem" }} component={"span"}>TELEFONE:</Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: green[500] }} >{userInterno?.telefone.toUpperCase()}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "0.7rem" }} component={"span"}>E-MAIL:</Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: green[500] }} >{userInterno?.email.toUpperCase()}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "0.7rem" }} component={"span"}>CPF:</Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: green[500] }} >{userInterno?.cpf.toUpperCase()}</Typography>
                    </Box>
                </Box>



            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
                {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >



                    <Box onSubmit={async e => {
                        let obj = { ...userInterno }

                        e.preventDefault()

                        // const form = e.target;

                        // for (const iterator of form.elements) {
                        //     if (iterator.tagName === "INPUT") {
                        //         if (iterator.type === "date") {
                        //             obj = { ...obj, [iterator["name"]]: dayjs(iterator.value) }
                        //         } else {

                        //             obj = { ...obj, [iterator["name"]]: iterator.value }
                        //         }

                        //     }
                        // }
                        // console.log(obj)

                        try {

                            await api.put("/clientes/update", { ...obj }).then(r => {
                                if (r.data.status) {
                                    Swal.fire(
                                        'Atualizado realizado com sucesso!',
                                        '',
                                        'success'
                                    );
                                    setClientes(a => {
                                        let novo = a.filter(i => (i.id != obj.id));
                                        novo.push(obj)
                                        return novo
                                    })


                                }
                            })
                        } catch (error) {
                            alert("Este Serviço esta Indisponivel no momento")

                        }






                    }} component={"form"}>
                        <FormControl >
                            <Divider sx={{ mb: 2, mt: 2 }}>
                                <Chip label="Dados pessoais"></Chip>
                            </Divider>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="Nome"
                                name='nome'
                                type='text'
                                onChange={e => setUserinterno(a => ({ ...a, name: e.target.value }))}

                                value={userInterno?.name}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                InputLabelProps={{ shrink: true }}
                                onChange={e => setUserinterno(a => ({ ...a, cpf: e.target.value }))}
                                label="CPF"
                                name='cpf'
                                type='text'
                                // placeholder={user.cpf}
                                value={userInterno?.cpf}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                InputLabelProps={{ shrink: true }}
                                label="Telefone"
                                name='telefone'
                                type='text'
                                // placeholder={user.telefone}
                                value={userInterno?.telefone}
                                onChange={e => setUserinterno(a => ({ ...a, telefone: e.target.value }))}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                label="Nascimento"
                                name='nascimento'
                                type='date'
                                onSelect={e => setUserinterno(a => ({ ...a, nascimento: dayjs(e.target.value).format("DD-MM-YYYY") }))}
                                defaultValue={dayjs(userInterno?.nascimento).format("YYYY-MM-DD")}
                            />
                            <Divider sx={{ mb: 2, mt: 2 }} >
                                <Chip label="Dados de Acesso"></Chip>
                            </Divider>

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="E-mail"
                                name='email'
                                type='text'
                                value={userInterno?.email}
                                onChange={e => setUserinterno(a => ({ ...a, email: e.target.value }))}
                            />


                            
                            <FormControl sx={{mt:2}}>
                            <InputLabel htmlFor="password">Senha</InputLabel>
                            <Input
                                value={userInterno?.password}
                                onChange={e => setUserinterno(a => ({ ...a, password: e.target.value }))}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="password"
                                            onClick={() => setshowPassword(a => !a)}
                                            onMouseDown={(e) => { e.preventDefault() }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            </FormControl>

                            <Divider sx={{ mb: 2, mt: 2 }} >
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
                                value={userInterno?.cidade}
                                onChange={e => setUserinterno(a => ({ ...a, cidade: e.target.value }))}
                            />
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mt: 2
                                }}
                                name='bairro'
                                label="Bairro"
                                type='text'
                                value={userInterno?.bairro}
                                onChange={e => setUserinterno(a => ({ ...a, bairro: e.target.value }))}
                            />
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mt: 2
                                }}
                                name='endereco'
                                label="Endereço"
                                type='text'
                                value={userInterno?.endereco}
                                onChange={e => setUserinterno(a => ({ ...a, endereco: e.target.value }))}
                            />

                            <Button
                                sx={{ mt: 2 }}
                                variant='contained'
                                color='success'
                                type='submit'
                            >
                                Atualizar
                            </Button>


                        </FormControl>
                    </Box>





                </CardContent>
            </Collapse>
        </Card>
    );
}
