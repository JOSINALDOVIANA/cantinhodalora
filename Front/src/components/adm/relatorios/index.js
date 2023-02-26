import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, useTheme } from '@mui/material'
import { api } from '../../../api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subYears } from 'date-fns';

// import { Container } from './styles';

function Relatorios() {
  const theme=useTheme();
  const [colaboradores, setCol] = React.useState([])//todos os colaboradores
  const [gerentes, setGer] = React.useState([])//todos os gerentes
  const [desabilitar, setDesabilitar] = React.useState([true,true,true,true])


  const [controlecol, setContCOL] = React.useState('');//vai conter o id do colaborador selecionado
  const [controleGer, setContGer] = React.useState('');//vai conter o id do gerente selecionado

  const [closes, setCloses] = React.useState([]);//todos os fechamentos

  const [closesFilter, setClosesF] = React.useState([]);//fechamentos filtrados

  const [YearSelect, setYearselect] = React.useState(null); 
  const [MonthSelect, setMonthselect] = React.useState(null);
  const [DaySelect, setDayselect] = React.useState(null);


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
  React.useEffect(() => {
    
    api.get("/fechamentogerente").then(r => {
      console.log(r.data)
      if (r.data.status) {
        setCloses(r.data.close)
        setClosesF(r.data.close)
      }
    })
  }, [])



  const handleChangeConCol = (event) => {
    setContCOL(event.target.value);
    setClosesF(a => {
      return (closes.filter(c => (c.id_col == event.target.value) && (c.id_users == controleGer)))
    })
    setDesabilitar(a=>([...a,a[1]=false]))
  };

  const handleChangeConGer = (event) => {
    setContGer(event.target.value)
    setClosesF(closes.filter(g => g.id_users == event.target.value));
    setDesabilitar(a=>([...a,a[0]=false]))

  };

  console.log(closesFilter)
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        marginTop:theme.spacing(10)


      }}
    >
      <Paper
        sx={{ background: "#fff", width: "100vw", padding: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        className='form-control row'
      >
        <div style={{ width: "100%" }} className="row">
          <div className="col">
            <FormControl sx={{ width: "100%", margin: 1, background: "#fff" }}>
              <InputLabel  id="demo-simple-select-label">Gerente</InputLabel>
              <Select
                labelId="demo-simple-select-label"                
                value={controleGer}
                label="Gerente"
                onChange={handleChangeConGer}
                
              >

                {
                  gerentes?.map((ger) => (<MenuItem key={ger.id + "ger"} value={ger.id}>{ger.name}</MenuItem>))
                }

              </Select>
            </FormControl>
          </div>
          <div className="col">
            <FormControl sx={{ width: "100%", margin: 1, background: "#fff" }}>
              <InputLabel  id="demo-simple-select-label">Colaborador</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={controlecol}
                disabled={desabilitar[0]}
                label="Colaborador"
                onChange={handleChangeConCol}
              >

                {
                  colaboradores?.map((col) => (<MenuItem key={col.id + "col"} value={col.id}>{col.name}</MenuItem>))
                }

              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ width: "100%"}} className="row">
          <div className='col'>
            <DatePicker
              className='m-2'
              showYearPicker
              minDate={subYears(new Date(), 1)}
              dateFormat="yyyy"
              selected={YearSelect}
              onChange={(date) => {
                setYearselect(date);

                setClosesF(closes.filter(i => {
                  let d = new Date(i.updated_at);

                  return ((date.getFullYear() == d.getFullYear()) && (i.gerente.id == controleGer) && (i.colaborador.id == controlecol))
                }))
                setDesabilitar(a=>([...a,a[2]=false]))
              }}
              placeholderText="Ano"
              disabled={desabilitar[1]}
            />
          </div>
          <div className='col' >
            <DatePicker
              className='m-2'
              showMonthYearPicker
              dateFormat="MM"
              selected={MonthSelect}
              onChange={(date) => {
                setMonthselect(date);

                setClosesF(closes.filter(i => {
                  let d = new Date(i.updated_at);

                  return ((date.getMonth() == d.getMonth()) && (i.gerente.id == controleGer) && (i.colaborador.id == controlecol)&&(d.getFullYear()==YearSelect.getFullYear()))
                }))
                setDesabilitar(a=>([...a,a[3]=false]))
              }}
              placeholderText="Mês"
              disabled={desabilitar[2]}
            />
          </div>
          <div className='col' >
            <DatePicker
              className='m-2'
              
              dateFormat="dd"
              selected={DaySelect}
              onChange={(date) => {
                setDayselect(date);

                setClosesF(closes.filter(i => {
                  let d = new Date(i.updated_at);

                  return ((date.getDate() == d.getDate()) && (i.gerente.id == controleGer) && (i.colaborador.id == controlecol)&&(d.getFullYear() == YearSelect.getFullYear())&&(d.getMonth()==MonthSelect.getMonth()))
                }))
              }}
              placeholderText="Dia"
              disabled={desabilitar[3]}
            />
          </div>
        </div>
      </Paper>
      {/* <Box sx={{overflow:"scroll"}}>
      <div style={{ background: "#ddd", display: "flex", height: "2em" }} className='row'>
        <div className='col' style={{ width: "100%", height: "2em", textAlign: "center", border: " solid  1px   #000" }}><p>Colaborador</p></div>
        <div className='col ' style={{ width: "100%", height: "2em", textAlign: "center", border: " solid  1px   #000" }}><p>Gerente</p></div>
        <div className='col ' style={{ width: "100%", height: "2em", textAlign: "center", border: " solid  1px   #000" }}><p>Venda/cartão</p></div>
        <div className='col ' style={{ width: "100%", height: "2em", textAlign: "center", border: " solid  1px   #000" }}><p>Venda/dinheiro</p></div>
        <div className='col ' style={{ width: "100%", height: "2em", textAlign: "center", border: " solid  1px   #000" }}><p>Venda/total</p></div>
        <div className='col ' style={{ width: "100%", height: "2em", textAlign: "center", border: " solid  1px   #000" }}><p>Fechamento/Ger</p></div>
        <div className='col ' style={{ width: "100%", height: "2em", textAlign: "center", border: " solid  1px   #000" }}><p>Diferença/Ger</p></div>
      </div>
      {closesFilter.map(item => (
        <div key={item.id} style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }} className='row'>
          <p className='col m-3' style={{ width: "100%", textAlign: "initial" }}>{item.colaborador.name}</p>
          <p className='col m-3' style={{ width: "100%", textAlign: "initial" }}>{item.gerente.name}</p>
          <p className='col m-3' style={{ width: "100%", textAlign: "initial" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.FCcolaborador.valcart)}</p>
          <p className='col m-3' style={{ width: "100%", textAlign: "initial" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.FCcolaborador.valdin)}</p>
          <p className='col m-3' style={{ width: "100%", textAlign: "initial" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.FCcolaborador.valtotal)}</p>
          <p className='col m-3' style={{ width: "100%", textAlign: "initial" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.FCcolaborador.valtotal)}</p>
          <p className='col m-3' style={{ width: "100%", textAlign: "initial" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.valconf)}</p>
          <p className='col m-3' style={{ width: "100%", textAlign: "initial" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.valdesv)}</p>
        </div>
      ))}
      </Box> */}

      <table className="table" style={{ overflow: "scroll" }}>
        <thead>
          <tr>
            <th scope="col">FC</th>
            <th scope="col">Gerente</th>
            <th scope="col">Colaborador</th>
            <th scope="col">Venda/Cart</th>
            <th scope="col">Venda/Din</th>
            <th scope="col">Venda/Total</th>
            <th scope="col">Conferência/Ger</th>
            <th scope="col">Diferença</th>
            <th scope="col">Gastos</th>
            <th scope="col">Saldo/final</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody>

          {closesFilter.map(item => (
            <tr key={item.id + "col"}>
              <th scope="row">{item.id}</th>
              <td>{item.gerente.name}</td>
              <td>{item.colaborador.name}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.FCcolaborador.valcart)}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.FCcolaborador.valdin)}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.FCcolaborador.valtotal)}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.valconf)}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.valdesv)}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.valgast)}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(item.valsald)}</td>
              <td>{`${new Date(item.updated_at).getDate()} / ${new Date(item.updated_at).getMonth() < 10 ? "0" + (new Date(item.updated_at).getMonth() + 1) : new Date(item.updated_at).getMonth() + 1} / ${new Date(item.updated_at).getFullYear()}`}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </Box>


  );
}

export default Relatorios;