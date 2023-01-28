import { Avatar, Box, Button, Chip, Divider, FormControl, Grid, ImageList, ImageListItem, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography, styled } from '@mui/material';
import React from 'react';
import { api, url } from '../../../api';
import { uniqueId } from 'lodash';
import { TfiTrash, TfiRulerPencil, TfiStackOverflow } from "react-icons/tfi";
import { AiTwotoneSave } from "react-icons/ai";
import "./styleeditar.css";
import Swal from 'sweetalert2';

// import { Container } from './styles';
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
function FecharCaixa() {

    // const [dados] = useOutletContext();
    const [produtos, setProd] = React.useState([]);
    const [selectprod, setSelectP] = React.useState({ index: "", id: "", prod: {} });
    const [fechamento, setFechamento] = React.useState({ colaborador: "", gerente: "", valorF: { cart: 0, dinheiro: 0, comiss: 0, gastos: 0, total: 0, saldo: 0 }, valorC: 0, ValorDIF: 0 })

    const [colaboradores, setCol] = React.useState(["Joilson Martins", "Agel"])
    const [gerentes, setGer] = React.useState(["Josinaldo Viana", "Francisca Gislaiane"])

    const [openE, setOpenE] = React.useState(false);
    const handleOpenE = () => setOpenE(true);
    const handleCloseE = () => setOpenE(false);


function calculaValor(qi,qf,preco){

    let v = qf-qi;
    return (v<0?v*(-1)*(preco):0)
}


    React.useEffect(() => {
        api.get("/produtos").then(r => {
            let p = r.data.produtos
            if (r.data.status) {
                setProd(p)
            }
        })
    }, [])




    const [controlecol, setContCOL] = React.useState('');
    const [controleGer, setContGer] = React.useState('');

    const handleChangeConCol = (event) => {
        setContCOL(event.target.value);
        setFechamento(a => {
            return ({ ...a, colaborador: colaboradores[event.target.value] })
        })
    };

    const handleChangeConGer = (event) => {
        setContGer(event.target.value);
        setFechamento(a => {
            return ({ ...a, gerente: gerentes[event.target.value] })
        })
    };
    console.log(fechamento)
    return (
        <div className='p-1'>







            <form style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }} className='container'>
                <div className="form-row row">
                    <div className="form-group col-md-6">
                        <FormControl sx={{ width: "100%", margin: 1, background: "#fff" }}>
                            <InputLabel id="demo-simple-select-label">Colaborador</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={controlecol}
                                label="Colaborador"
                                onChange={handleChangeConCol}
                            >

                                {
                                    colaboradores.map((col, i) => (<MenuItem key={i + "col"} value={i}>{col}</MenuItem>))
                                }

                            </Select>
                        </FormControl>
                    </div>
                    <div className="form-group col-md-6">
                        <FormControl sx={{ width: "100%", margin: 1, background: "#fff" }}>
                            <InputLabel id="demo-simple-select-label">Gerente</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={controleGer}
                                label="Gerente"
                                onChange={handleChangeConGer}
                            >

                                {
                                    gerentes.map((ger, i) => (<MenuItem key={i + "ger"} value={i}>{ger}</MenuItem>))
                                }

                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/* <div className="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div> */}


                <Divider sx={{ margin: 1 }}>
                    <Chip label="Valores informados pelo Colaborador" />
                </Divider>

                <div className="form-row row">
                    <div className="form-group col-md-3">
                        <label for="inputCity">Valor/Cartão</label>
                        <input type="text" value={fechamento.valorF.cart}
                            onChange={
                                e => setFechamento(a => (
                                    {
                                        ...a,
                                        valorF: {
                                            ...a.valorF,
                                            cart: e.target.value,
                                            total: (parseFloat(a.valorF.dinheiro) + parseFloat(e.target.value))
                                        }
                                    }
                                )
                                )
                            }
                            className="form-control" />
                    </div>
                    <div className="form-group col-md-3">
                        <label for="inputState">Valor/Dinheiro</label>
                        <input
                            onChange={
                                e => setFechamento(a => (
                                    {
                                        ...a,
                                        valorF: {
                                            ...a.valorF,
                                            dinheiro: e.target.value,
                                            total: (parseFloat(a.valorF.cart) + parseFloat(e.target.value))
                                        }
                                    }
                                )
                                )
                            }
                            type="text"
                            className="form-control" />
                    </div>
                    <div className="form-group col-md-2">
                        <label for="inputZip">Total</label>
                        <input disabled type="text" value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(fechamento.valorF.total)} className="form-control" id="inputZip" />
                    </div>
                    <div className="form-group col-md-2">
                        <label for="inputZip">Gastos</label>
                        <input
                            value={fechamento.valorF.gastos}
                            onChange={
                                e => setFechamento(a => (
                                    {
                                        ...a,
                                        valorF: {
                                            ...a.valorF,
                                            gastos: e.target.value,
                                            saldo: ((parseFloat(a.valorF.total)) - (parseFloat(a.valorF.comiss) + parseFloat(e.target.value)))
                                        }
                                    }
                                )
                                )
                            }
                            type="text"
                            className="form-control" id="inputZip" />
                    </div>
                    <div className="form-group col-md-2 ">
                        <label for="inputZip">Comissão</label>
                        <input
                            value={fechamento.valorF.comiss}
                            onChange={
                                e => setFechamento(a => (
                                    {
                                        ...a,
                                        valorF: {
                                            ...a.valorF,
                                            comiss: e.target.value,
                                            saldo: ((parseFloat(a.valorF.total)) - (parseFloat(a.valorF.gastos) + parseFloat(e.target.value)))
                                        }
                                    }
                                )
                                )
                            }
                            type="text"
                            className="form-control" id="inputZip" />
                    </div>

                    <div className="form-group col-md-2 mt-2">
                        <label for="inputZip">Saldo</label>
                        <input disabled type="text" value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(fechamento.valorF.saldo)} className="form-control" id="inputZip" />
                    </div>
                </div>
                <Divider sx={{ margin: 1, marginTop: 2 }}>
                    <Chip label="Valores Conferidos pelo Gerente" />
                </Divider>
                <div className="form-group row">
                    <div className="form-group col-4" >
                        <label className="" >
                            Conferência
                        </label>
                        <input
                            disabled
                            value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(fechamento.valorC)}
                            className="form-control"
                            type="text"
                            id="gridCheck" />
                    </div>
                    <div className="form-group col-4 mb-2" >
                        <label className="" >
                            Diferência
                        </label>
                        <input
                            disabled
                            value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(parseFloat(fechamento.valorC) - parseFloat(fechamento.valorF.total))}
                            className="form-control"
                            type="text"
                            id="valorDIF" />
                    </div>
                    <Button variant='contained' color='success' className="form-group btn btn-primary col-4">Salvar</Button>
                </div>
            </form>



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


                                    {/* <div onClick={(e) => {
                                        e.preventDefault();
                                        let prod = p;
                                        prod.cat = prod.cat.map(c => (c.id))
                                        prod.logos = prod.logos.map(l => (`${l.id}`))
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
                                    }} className="col-6 caixa">
                                        <AiTwotoneSave color="#04B431" size={20} />
                                    </div> */}
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
                            let v=calculaValor(parseInt(prod.und),parseInt(prod.QTNE),parseFloat(prod.preco))//calculando qauntas unidades faltam
                            console.log(v)
                            prod.und=prod.QTNE//definindo as novas unidades 
                            prod.cat = prod.cat.map(c => (c.id))//transformando as categorias em array [1,2,3]
                            prod.logos = prod.logos.map(l => (`${l.id}`))//transformando as logos em array [1,2,3]
                            prs[selectprod.index] = prod;//setando os novos dados em produtos no mesmo index aanterior
                            setFechamento(a=>({...a,valorC:(parseFloat(a.valorC)+v)}))// setando a conferencia no caixa
                            setProd(prs)// atualizando todos os produtos

                            //salvado no banco
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


        </div>
    );
}

export default FecharCaixa;