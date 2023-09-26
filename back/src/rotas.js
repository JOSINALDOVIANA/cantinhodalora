import express from  "express";
import multer from 'multer';
import path from 'path';


import { fileURLToPath } from 'url';

import promo from "./controller/promo/index.js";
import users from "./controller/users/index.js";
import Produtos from "./controller/produtos/index.js";
import payments from "./controller/payments/index.js";
import { promisify } from "util";
import config from "./controller/multer/config.js";
import images from "./controller/images/index.js";
import categorias from "./controller/categorias/index.js";
import cols from "./controller/cols/index.js";
import close_col from "./controller/close_col/index.js";
import close from "./controller/close/index.js";
import clientes from "./controller/clientes/index.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const rotas=express.Router();


// #####################IMAGENS clientes############################

rotas.post("/uploadImage",multer(config).single('file'),images.uploadIMGclient)

rotas.delete("/deleteImage",images.deleteIMGclient)

rotas.get("/imagesget",images.selectIMGclient)
// #######################################################



// #####################IMAGENS Produtos############################

rotas.post("/insertImageP",multer(config).single('file'),images.uploadIMGprod)

rotas.delete("/deleteImageP",images.deleteIMGprod)

rotas.get("/selectimagesP",images.selectIMGprod)





// #####################USERS###############################

rotas.get("/users",users.Select);
rotas.post("/login",users.Login);
rotas.put("/update",users.Update);
rotas.post("/insert",users.Insert);





// #####################Produtos###############################


rotas.post("/produtos",Produtos.Insert);
rotas.get("/produtos",Produtos.Select);
rotas.delete("/produtos",Produtos.Delete);
rotas.put("/produtos",Produtos.Update);



// CATEGORIAS

rotas.post("/categorias",categorias.insert)
rotas.get("/categorias",categorias.select)

//cols colaboradores
 rotas.post("/cols",cols.Insert)
 rotas.put("/cols",cols.Update)
 rotas.get("/cols",cols.Select)
 rotas.delete("/cols",cols.Delete)


//close_col fechamento do colaborador

rotas.post("/fechamentocolaborador",close_col.Insert)
rotas.put("/fechamentocolaborador",close_col.Update)
rotas.get("/fechamentocolaborador",close_col.Select)
rotas.delete("/fechamentocolaborador",close_col.Delete)

//close fechamento geral

rotas.post("/fechamentogerente",close.Insert)
rotas.put("/fechamentogerente",close.Update)
rotas.get("/fechamentogerente",close.Select)
rotas.delete("/fechamentogerente",close.Delete)

//pagamentos faze de teste
// rotas.post("/payments/create",payments.Insert)
// rotas.post("/payments/conf",payments.Insert2)
// rotas.get("/payments/get",payments.Select)
// rotas.delete("/payments/delete",payments.DEL)


//pagamentos faze de teste
rotas.post("/promo",promo.Insert)
rotas.get("/promo",promo.Select)
rotas.put("/promo",promo.Update)
rotas.delete("/promo",promo.Delete)

// ####################clientes########################
rotas.post("/clientes/login",clientes.Login)
rotas.post("/clientes/insert",clientes.Insert)
rotas.post("/clientes/update",clientes.Update)




export default rotas;