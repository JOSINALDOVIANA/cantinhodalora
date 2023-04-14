

import path from 'path';
import * as fs from 'fs';
import Crypto from 'crypto';

import { fileURLToPath } from 'url';
import { promisify } from 'util';

import conexao from '../../databases/conexao.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


export default {
    async uploadIMGclient (req,res){
        let { originalname: name, size, key, location: url = ''} = req.file;
        // console.log(req.body)
        // url=`http://localhost:3001/images/${key}`
            const id = `${Crypto.randomBytes(12).toString('HEX')}`;
    
            try {
                await conexao('images').insert({
                    id,
                    name,
                    size,
                    key,
                    url,
                    prod:false
                    
                });
                res.json({
                    id, name, size, key, url,prod:false
                });
            } catch (error) {
                console.error(error)
                return res.json({status:false,mensagem:"error"
                })
            }
     
    },
    async deleteIMGclient (req,res){
        const {id,key}=req.query
        // console.log(req.query)
        try {
           await conexao("images").del().where({id,prod:false});
         promisify(fs.unlink)(path.resolve(__dirname, "..", "..","tmp", "uploads", `${key}`), (err) => {
            if (err) { console.log("não foi possivel apagar o arquivo"); }
            else { console.log('aquivo deletado'); };
        })
          
           return res.json({status:true,mensagem:"apagada"})
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"error ao excluir"})
        }
    },
    async selectIMGclient (req,res){
        try {
            let images=await conexao("images").where({prod:false})
            for (const key in images) {
               images[key].delete=`http://${process.env.IP_SERVER}:3009/deleteImage?id=${images[key].idimage}&key=${images[key].key}`
               images[key].url=`http://${process.env.IP_SERVER}:3009/images/${images[key].key}}`;
            }
            return res.json({status:true,images})
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"error ao consultar"})
        }
    },
    async uploadIMGprod (req,res){
        let { originalname: name, size, key, location: url = '' } = req.file;
       
            const id = `${Crypto.randomBytes(12).toString('HEX')}`;
    
            try {
                await conexao('images').insert({
                    id,
                    name,
                    size,
                    key,
                    url,
                    prod:true
                    
                });
                res.json({
                    id, name, size, key, url,prod:true
                });
            } catch (error) {
                console.error(error)
                return res.json({status:false,mensagem:"error"
                })
            }
     
    },
    async deleteIMGprod (req,res){
        const {id,key}=req.query
        console.log(req.query)
        try {
           await conexao("images").del().where({id});
           promisify(fs.unlink)(path.resolve(__dirname, "..","..", "tmp", "uploads", `${key}`), (err) => {
            if (err) { console.log("não foi possivel apagar o arquivo"); }
            else { console.log('aquivo deletado'); };
        })
          
           return res.json({status:true,mensagem:"apagada"})
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"error ao excluir"})
        }
    },
    async selectIMGprod(req,res){
        let {id}=req.query;
        let images=[];

        try {
            if(!!id){
                images=await conexao("images").where({prod:true,id})
            }else{
                images=await conexao("images").where({prod:true})
            }
            for (const key in images) {
               images[key].delete=`http://${process.env.IP_SERVER}:3009/deleteImageP?id=${images[key].id}&key=${images[key].key}`;
               images[key].url=`http://${process.env.IP_SERVER}:3009/images/${images[key].key}`;

            }
            return res.json({status:true,images})
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"error ao consultar"})
        }
    }
    
}