import express, { Router } from  "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Crypto from 'crypto';

import { fileURLToPath } from 'url';

import conexao from "./databases/conexao.js";
import users from "./controller/users/index.js";
import Produtos from "./controller/produtos/index.js";
import { promisify } from "util";
import config from "./controller/multer/config.js";
import images from "./controller/images/index.js";
import categorias from "./controller/categorias/index.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const rotas=express.Router();


// #####################IMAGENS clientes############################

rotas.post("/uploadImage",
multer(config).single('file'),images.uploadIMGclient)

rotas.delete("/deleteImage",images.deleteIMGclient)

rotas.get("/imagesget",images.selectIMGclient)
// #######################################################



// #####################IMAGENS Produtos############################

rotas.post("/insertImageP",
multer(config).single('file'),
images.uploadIMGprod
)

rotas.delete("/deleteImageP",images.deleteIMGprod)

rotas.get("/selectimagesP",images.selectIMGprod)


// #######################################################


// #####################USERS###############################

// rotas.get("/users",users.select);
rotas.post("/login",users.login);
rotas.post("/update",users.Update);



// ###########################################################

// #####################Produtos###############################


rotas.post("/produtos",Produtos.Cadastro);
rotas.get("/produtos",Produtos.Select);
rotas.delete("/produtos",Produtos.Delete);
rotas.put("/produtos",Produtos.Update);




// ###########################################################


// CATEGORIAS:

rotas.post("/categorias",categorias.insert)
rotas.get("/categorias",categorias.select)

export default rotas;