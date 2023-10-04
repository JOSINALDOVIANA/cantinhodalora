import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import locale_pt from 'dayjs/locale/pt-br'
import { Box, Button, Chip, Divider, FormControl, InputAdornment, OutlinedInput, Paper, TextField } from '@mui/material';
import { uniqueId } from 'lodash';
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

export default function RecipeReviewCard({ user,setClientes }) {
    dayjs.locale(locale_pt);
    const [expanded, setExpanded] = React.useState(false);
    const [showPassword, setshowPassword] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const theme = useTheme()

    return (
        <Card sx={{
            mt: 2,
            // position:"absolute"
        }}>
            <CardHeader
                avatar={
                    <Avatar src={user?.img?.url} sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {user?.name[0]}
                    </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={user?.name}
                subheader={"Cliente Desde: " + dayjs(user?.updatedAt).format("ddd, D  MMM  YYYY")}
            />
            {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
            <CardContent>



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
                        let obj={...user}

                        e.preventDefault()

                        const form = e.target;

                        for (const iterator of form.elements) {
                            if (iterator.tagName === "INPUT") {
                                if (iterator.type === "date") {
                                   obj= { ...obj, [iterator["name"]]: dayjs(iterator.value)}
                                } else {

                                   obj= { ...obj, [iterator["name"]]: iterator.value }
                                }

                            }
                        }

                        try {

                            await api.post("/clientes/update", { ...obj }).then(r => {
                                if (r.data.status) {
                                    Swal.fire(
                                        'Atualizado realizado com sucesso!',
                                        '',
                                        'success'
                                    );
                                    setClientes(a=>{
                                        let novo=a.filter(i=>(i.id!=obj.id));
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
                                placeholder={user.name}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                InputLabelProps={{ shrink: true }}
                                label="CPF"
                                name='cpf'
                                type='text'
                                placeholder={user.cpf}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                InputLabelProps={{ shrink: true }}
                                label="Telefone"
                                name='telefone'
                                type='text'
                                placeholder={user.telefone}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                label="Nascimento"
                                name='nascimento'
                                type='date'
                                defaultValue={dayjs(user.nascimento).format("YYYY-MM-DD")}
                            />
                            <Divider sx={{ mb: 2, mt: 2 }} >
                                <Chip label="Dados de Acesso"></Chip>
                            </Divider>

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="E-mail"
                                name='email'
                                type='text'
                                placeholder={user.email}
                            />
                            <TextField
                                sx={{
                                    mt: 2
                                }}
                                InputLabelProps={{ shrink: true }}
                                label="Telefone"
                                name='telefone'
                                type='text'
                                placeholder={user.telefone}
                            />

                            {/* <InputLabel htmlFor="password">Senha</InputLabel> */}
                            <OutlinedInput
                                sx={{ mt: 2 }}
                                InputLabelProps={{ shrink: true }}
                                id='password'
                                label="Senha"
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder={user?.password}
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
                                placeholder={user?.cidade}
                            />
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mt: 2
                                }}
                                name='bairro'
                                label="Bairro"
                                type='text'
                                placeholder={user?.bairro}
                            />
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    mt: 2
                                }}
                                name='endereco'
                                label="Endereço"
                                type='text'
                                placeholder={user?.endereco}
                            />

                            <Button
                            sx={{mt:2}}
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
