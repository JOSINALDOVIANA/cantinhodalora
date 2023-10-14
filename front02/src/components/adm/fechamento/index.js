import React from 'react';
import {  Box, Button, Chip, Divider, FormControl, Grid,  InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography, styled, useTheme } from '@mui/material';
import { api, url } from '../../../api';

import {  TfiRulerPencil, TfiStackOverflow } from "react-icons/tfi";

import "./styleeditar.css";
import Swal from 'sweetalert2';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
const InputPerson = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(2)
    },
    "& ": { marginRight: theme.spacing(1) }
}))
function FecharCaixa() {
    const theme = useTheme();


    // const [dados] = useOutletContext();
    const [produtos, setProd] = React.useState([]);
    const [selectprod, setSelectP] = React.useState({ index: "", id: "", prod: {} });
    const [fechamento, setFechamento] = React.useState({ colaborador: "", gerente: "", valgast: 0, valorF: { cart: 0, dinheiro: 0, comiss: 0, total: 0, saldo: 0 }, valorC: 0, ValorDIF: 0, valsald: 0 })

    const [colaboradores, setCol] = React.useState([])
    const [gerentes, setGer] = React.useState([])

    const [openE, setOpenE] = React.useState(false);
    const handleOpenE = () => setOpenE(true);
    const handleCloseE = () => setOpenE(false);





    React.useEffect(() => {
        api.get("/produtos").then(r => {
            let p = r.data.produtos
            if (r.data.status) {
                setProd(p)
            }
        })
    }, [])
    React.useEffect(() => {
        api.get("/cols").then(r => {
            // console.log(r.data)
            if (r.data.status) {
                setCol(r.data.cols)
            }
        })
    }, [])
    React.useEffect(() => {
        api.get("/users").then(r => {
            // console.log(r.data)
            if (r.data.status) {
                setGer(r.data.users)
            }
        })
    }, [])




    const [controlecol, setContCOL] = React.useState('');
    const [controleGer, setContGer] = React.useState('');

    const handleChangeConCol = (event) => {
        setContCOL(event.target.value);
        setFechamento(a => {
            return ({ ...a, colaborador: colaboradores.filter(col => col.id == event.target.value)[0].id })
        })
    };

    const handleChangeConGer = (event) => {
        setContGer(event.target.value);
        setFechamento(a => {
            return ({ ...a, gerente: gerentes.filter(ger => ger.id == event.target.value)[0].id })
        })
    };

    return (
        <Paper component={"div"} elevation={0} className='p-1'>
            <Paper sx={{ padding: theme.spacing(1) }} >
                <Box component={"form"} sx={{ display: "flex", flexDirection: "column", marginBottom: "20px" }} className='container'>
                    <Box
                        sx={{ display: "flex", justifyContent: "space-evenly", [theme.breakpoints.down("md")]: { flexDirection: "collum" } }}
                    >

                        <FormControl sx={{ width: "50%", margin: 1 }}>
                            <InputLabel id="demo-simple-select-label">Colaborador</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={controlecol}
                                label="Colaborador"
                                onChange={handleChangeConCol}
                            >

                                {
                                    colaboradores?.map((col) => (<MenuItem key={col.id + "col"} value={col.id}>{col.name}</MenuItem>))
                                }

                            </Select>
                        </FormControl>


                        <FormControl sx={{ width: "50%", margin: 1, }}>
                            <InputLabel id="demo-simple-select-label">Gerente</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={controleGer}
                                label="Gerente"
                                onChange={handleChangeConGer}
                            >

                                {
                                    gerentes?.map((ger) => (<MenuItem key={ger.id + "ger"} value={ger.id}>{ger.name}</MenuItem>))
                                }

                            </Select>
                        </FormControl>

                    </Box>
                    <Divider sx={{ margin: 1 }}>
                        <Chip label="Valores informados pelo Colaborador" />
                    </Divider>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            with: "100%",
                            margin: theme.spacing(1),
                            [theme.breakpoints.down("md")]: {
                                flexDirection: "column"
                            }
                        }}
                    >
                        <InputPerson
                            value={fechamento.valorF.cart}
                            onChange={e => setFechamento(a => (
                                {
                                    ...a,
                                    valorF: {
                                        ...a.valorF,
                                        cart: e.target.value,
                                        total: (parseFloat(a.valorF.dinheiro) + parseFloat(e.target.value)),
                                        comiss: ((parseFloat(a.valorF.dinheiro) + parseFloat(e.target.value)) * 0.2),
                                        saldo: ((parseFloat(a.valorF.dinheiro) + parseFloat(e.target.value)) - ((parseFloat(a.valorF.dinheiro) + parseFloat(e.target.value)) * 0.2))
                                    }
                                }
                            )
                            )
                            }
                            type="text"
                            label="Valor/Cartão"
                        />
                        <InputPerson
                            value={fechamento.valorF.dinheiro}
                            onChange={
                                e => setFechamento(a => (
                                    {
                                        ...a,
                                        valorF: {
                                            ...a.valorF,
                                            dinheiro: e.target.value,
                                            total: (parseFloat(a.valorF.cart) + parseFloat(e.target.value)),
                                            comiss: ((parseFloat(a.valorF.cart) + parseFloat(e.target.value)) * 0.2),
                                            saldo: ((parseFloat(a.valorF.cart) + parseFloat(e.target.value)) - ((parseFloat(a.valorF.cart) + parseFloat(e.target.value)) * 0.2))
                                        }

                                    }
                                )
                                )
                            }
                            type="text"
                            label="Valor/Dinheiro"
                        />



                        <InputPerson label="Total" disabled type="text" value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(fechamento.valorF.total)} />


                        <InputPerson
                            value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(fechamento.valorF.comiss)}
                            disabled
                            label="Comissão"
                            type="text"
                        />


                        <InputPerson
                            label="Saldo"
                            disabled
                            type="text"
                            value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(fechamento.valorF.saldo)}
                        />

                    </Box>
                    <Divider sx={{ margin: 1, marginTop: 2 }}>
                        <Chip label="Valores Conferidos pelo Gerente" />
                    </Divider>
                    <Box
                        component={"div"}
                        sx={{ display: "flex", justifyContent: "space-evenly", [theme.breakpoints.down("md")]: { flexDirection: "column" } }}
                    >
                        <Box
                            sx={{  display: "flex", [theme.breakpoints.down("md")]: { flexDirection: "column" } }}
                        >

                            <InputPerson
                                label="Conferência"
                                disabled
                                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(fechamento.valorC)}

                                type="text"
                                id="gridCheck" />


                            <InputPerson
                                disabled
                                label=" Diferência"
                                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(parseFloat(fechamento.valorC) - parseFloat(fechamento.valorF.total))}

                                type="text"
                                id="valorDIF" />
                        </Box>
                        <Box sx={{ display: "flex", [theme.breakpoints.down("md")]: { flexDirection: "column" } }}>

                            <InputPerson
                                label="Gatos"
                                value={fechamento.valgast}
                                onChange={
                                    e => setFechamento(a => (
                                        {
                                            ...a,
                                            valsald: parseFloat(a.valorC) - parseFloat(e.target.value),
                                            valgast: e.target.value
                                        }
                                    )
                                    )
                                }
                                type="text"
                            />


                            <InputPerson
                                label="Saldo"
                                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(parseFloat(fechamento.valsald))}
                                disabled
                                type="text"
                            />
                        </Box>
                        <Button
                            variant='contained'
                            color='success'
                            sx={{
                                height:theme.spacing(7)
                            }}
                            
                            onClick={async () => {
                                let close_col = await api.post("/fechamentocolaborador", {
                                    id_col: fechamento.colaborador,
                                    valcart: fechamento.valorF.cart,
                                    valdin: fechamento.valorF.dinheiro,
                                    valcom: fechamento.valorF.comiss,
                                    valtotal: fechamento.valorF.total,
                                    valsaldo: fechamento.valorF.saldo
                                })
                                await api.post("fechamentogerente", {
                                    id_users: fechamento.gerente,
                                    id_col: fechamento.colaborador,
                                    id_close_col: close_col.data.dados.id,
                                    valconf: fechamento.valorC,
                                    valdesv: fechamento.ValorDIF,
                                    valgast: fechamento.valgast,
                                    valsald: fechamento.valsald
                                }).then(r => {
                                    if (r.data.status) {
                                        Swal.fire(
                                            'Atualizado!',
                                            '',
                                            'success'
                                        )
                                    } else {
                                        alert("error")
                                    }
                                })
                            }}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Paper>



            <Grid container alignItems="center" spacing={2}>
                {produtos?.map((p, index) => (
                    <Grid key={p.id + "prod"} item xs={6} sm={4} md={3} lg={3}>


                        <Paper

                            elevation={4}
                            sx={{
                                display: "flex",
                                borderRadius: 1,
                                flexDirection: "column",
                                fontFamily: "Roboto",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 1,
                                overflow: "hidden"


                            }}
                            className='card'


                        >





                            <Img alt={p.desc} src={url + "images/" + p.img.key} sx={{ borderRadius: 0, width: 100, height: 100, margin: 2 }} />



                            <Typography sx={{ textAlign: "center", color: "#404E5C", fontSize: "0.9em", width: "90%" }} noWrap variant="subtitle1" component="p">
                                {p.desc + " " + p.tam}
                            </Typography>





                            <Divider color="#000" sx={{ width: "90%" }} ></Divider>


                            <div className="container text-center mb-1 mt-1">
                                <div className="row g-2">

                                    <div onClick={() => { setSelectP({ id: p.id, index, prod: p }); handleOpenE() }} className="col-6 caixa">
                                        <TfiRulerPencil color="#04B431" size={20} />
                                    </div>



                                    <div className="col-6 caixa"></div>

                                </div>
                            </div>




                        </Paper>
                    </Grid>
                ))}

            </Grid>





            {/* -----Modal Edit---- */}
            <Modal
                open={openE}
                onClose={() => {

                    handleCloseE()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <TextField
                        sx={{ margin: 1 }}
                        value={selectprod.prod.desc}
                        disabled
                        type="text" label="Descrição"
                    />

                    <TextField
                        sx={{ margin: 1 }}
                        value={selectprod.prod.tam}
                        disabled
                        type="text" label="Tamanho"
                    />

                    <TextField
                        sx={{ margin: 1 }}
                        value={selectprod.prod.preco}
                        disabled
                        type="number" label="Preço/UND"
                    />

                    <TextField
                        sx={{ margin: 1 }}
                        value={selectprod.prod.und}
                        disabled
                        type="number" label="Quantidade/Antes"
                    />
                    <TextField
                        sx={{ margin: 1 }}
                        value={selectprod.prod.QTNE}
                        onChange={(e) => { setSelectP(a => ({ ...a, prod: { ...a.prod, QTNE: e.target.value } })); }}
                        type="number" label="Quantidade/Agora"
                    />
                    <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        color="success"
                        onClick={e => {
                            e.preventDefault();
                            let prs = produtos;//todos os produtos
                            let prod = selectprod.prod;//produto selecionado e editado
                            let v = (parseInt(prod.QTNE) - parseInt(prod.und)) * parseFloat(prod.preco)//calculando quantas unidades faltam e calculando preço

                            prod.und = prod.QTNE//definindo as novas unidades 
                            prod.cat = prod.cat.map(c => (c.id))//transformando as categorias em array [1,2,3]
                            prod.logos = prod.logos.map(l => (`${l.id}`))//transformando as logos em array [1,2,3]
                            prs[selectprod.index] = prod;//setando os novos dados em produtos no mesmo index aanterior
                            setFechamento(a => {
                                let c = (parseFloat(a.valorC) - v);
                                return ({ ...a, valorC: c, valsald: c - parseFloat(a.valgast) })
                            })// setando a conferencia no caixa
                            setProd(prs)// atualizando todos os produtos

                            //salvando no banco
                            api.put(`/produtos`, { ...prod }).then(r => {
                                if (r.data.status) {
                                    Swal.fire(
                                        'Atualizado!',
                                        '',
                                        'success'
                                    )
                                } else {
                                    alert("error")
                                }
                            })
                            handleCloseE()
                        }
                        }

                    >
                        Salvar
                    </Button>





                </Box>
            </Modal>


        </Paper>
    );
}

export default FecharCaixa;