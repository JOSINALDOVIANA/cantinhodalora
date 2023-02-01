import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { api } from '../../../api';

// import { Container } from './styles';

function Relatorios() {
  const [colaboradores, setCol] = React.useState([])
  const [gerentes, setGer] = React.useState([])
  const [controlecol, setContCOL] = React.useState('');
  const [controleGer, setContGer] = React.useState('');
  const [closes, setCloses] = React.useState([]);
  const [closesFilter, setClosesF] = React.useState([]);


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
    setClosesF(closes.filter(c => c.id_col == event.target.value))
  };

  const handleChangeConGer = (event) => {
    setContGer(event.target.value);
    // setFechamento(a => {
    //     return ({ ...a, gerente: gerentes.filter(ger => ger.id == event.target.value)[0].id })
    // })
  };

  console.log(closesFilter)
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",

      }}
    >
      <Paper
        sx={{ background: "#fff", width: "100vw", padding: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        className=''
      >
        <div style={{ width: "100%" }} className="row">
          <div className="col-4">
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
                  colaboradores?.map((col) => (<MenuItem key={col.id + "col"} value={col.id}>{col.name}</MenuItem>))
                }

              </Select>
            </FormControl>
          </div>
          <div className="col-4">
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
                  gerentes?.map((ger) => (<MenuItem key={ger.id + "ger"} value={ger.id}>{ger.name}</MenuItem>))
                }

              </Select>
            </FormControl>
          </div>
          <div className="col-3 align-items-center justify-content-center " style={{ display: "flex" }}>




            <input type="date" className='form-control' name="festa" min="2023-01-01" required />






          </div>
        </div>
      </Paper>
      <div  style={{ background: "#fff"}} className='row'>
        <p className='col' style={{ width: "100%", textAlign: "center" }}>Colaborador</p>
        <p className='col' style={{ width: "100%", textAlign: "center" }}>Gerente</p>
      </div>
      {/* {closesFilter.map(item => (
        <div key={item.id} style={{ background: "#fff", border: "solid 1px #dddd", display: "flex", alignItems: "center", justifyContent: "center" }} className='row'>
          <p className='col' style={{ width: "100%", textAlign: "center" }}>{item.colaborador.name}</p>
          <p className='col' style={{ width: "100%", textAlign: "center" }}>{item.gerente.name}</p>
        </div>
      ))} */}
    </Box>


  );
}

export default Relatorios;