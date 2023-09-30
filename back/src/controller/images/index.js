

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
        let {originalname: name, size, key, location: url = ''} = req.file;
        let {id_cli}=req.query;
        
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
                await conexao("image_cli").insert({id_image:id,id_cli});
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
        let status=false
        let mensagem=""
        try {
           await conexao("images").del().where({id,prod:false});
         promisify(fs.unlink)(path.resolve(__dirname, "..", "..","..","tmp", "uploads", `${key}`), (err) => {
            if (err) { mensagem="não foi possivel apagar o arquivo";console.log(err);status=false }
            else { mensagem='aquivo deletado';status=true };
        })
          
           return res.json({status,mensagem})
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"error ao excluir"})
        }
    },
    async selectIMGclient (req,res){
        let {id_cli}=req.query
        try {
            let images=await conexao("image_cli").where({prod:false,id_cli}).join("images","image_cli.id_image","=","images.id").select("images.*")
            console.log(images)
            for (const key in images) {
               images[key].delete=`http://${process.env.IP_SERVER}:3009/deleteImage?id=${images[key].id}&key=${images[key].key}`
               images[key].url=`http://${process.env.IP_SERVER}:3009/images/${images[key].key}`;
            }
            return res.json({status:true,images})
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"error ao consultar"})
        }
    },
    async uploadIMGprod (req,res){
        let { originalname: name, size, key, location: url = '' } = req.file;
        console.log(req.file)
       
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
           promisify(fs.unlink)(path.resolve(__dirname, "..","..","..","tmp", "uploads", `${key}`), (err) => {
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