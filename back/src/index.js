
import * as dotenv from 'dotenv';
dotenv.config();
// console.log(process.env)
import express from "express";
import cors from "cors";
import  path from 'path';
import requestIP from 'request-ip'
import  rotas from "./rotas.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const  api=express();

api.use(express.json())
api.use(requestIP.mw())
api.use((req,res)=>{
    console.log(req.clientIp)
})
api.use(cors({ exposedHeaders: ['Total_lojas_cliente', 'Total_categorias',
 'Total_criticas_loja', 'Total_categorias','login','update_prop','login_loja','FeedbackTotais','sugestoesTotais',
'PNETotais'] }));



api.use('/images',express.static(path.resolve(__dirname,'..','tmp','uploads')))

api.use(rotas);

api.listen(3009,(req,res)=>{
    console.log("rodando na porta 3009")
})