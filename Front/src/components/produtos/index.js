
import React from 'react';

import { useOutletContext } from "react-router-dom";
import GridContainer from '../Grid';

import Promo from '../promocoes/index.js';
import ImagesClientes from '../imagesClientes';
// import { Container } from './styles';

function Produtos() {
  // const [dados] = useOutletContext();
  // console.log(dados)
   
  return (
    <div>
      {/* Imagens clients */}
      {/* <ImagesClientes/> */}
      {/* Promoção */}
      <Promo></Promo>
      <GridContainer></GridContainer>
    </div>
  );
}

export default Produtos;