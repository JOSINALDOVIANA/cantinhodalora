import express from  "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Crypto from 'crypto';

import { fileURLToPath } from 'url';
import knex from "knex";
import conexao from "./databases/conexao.js";
import users from "./controller/users/index.js";
import Produtos from "./controller/produtos/index.js";
import { promisify } from "util";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const rotas=express.Router();


// #####################IMAGENS clientes############################

rotas.post("/uploadImage",
multer({
    // dest: Path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req,file, cb) => {

            cb(null, path.resolve(__dirname,  '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            Crypto.randomBytes(16, (err, hash) => {
                if (err) { cb(err) };
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            });
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'image/jpg',
            'image/svg',
            

        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('invalid file type.'));
        }
    }
}).single('file'),
async (req,res)=>{
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
 
}
)

rotas.delete("/deleteImage",async(req,res)=>{
    const {id,key}=req.query
    // console.log(req.query)
    try {
       await conexao("images").del().where({id,prod:false});
     promisify(fs.unlink)(path.resolve(__dirname, "..", "tmp", "uploads", `${key}`), (err) => {
        if (err) { console.log("não foi possivel apagar o arquivo"); }
        else { console.log('aquivo deletado'); };
    })
      
       return res.json({status:true,mensagem:"apagada"})
    } catch (error) {
        console.log(error)
        return res.json({status:false,mensagem:"error ao excluir"})
    }
})

rotas.get("/imagesget",async (req,res)=>{
    try {
        let images=await conexao("images").where({prod:false})
        for (const key in images) {
           images[key].delete=`deleteImage?idimage=${images[key].idimage}&key=${images[key].key}`
        }
        return res.json({status:true,images})
    } catch (error) {
        console.log(error)
        return res.json({status:false,mensagem:"error ao consultar"})
    }
})
// #######################################################



// #####################IMAGENS Produtos############################

rotas.post("/insertImageP",
multer({
    // dest: Path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {

            cb(null, path.resolve(__dirname,  '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            Crypto.randomBytes(16, (err, hash) => {
                if (err) { cb(err) };
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            });
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'image/jpg',
            'image/svg',
            

        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('invalid file type.'));
        }
    }
}).single('file'),
async (req,res)=>{
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
 
}
)

rotas.delete("/deleteImageP",async(req,res)=>{
    const {id,key}=req.query
    // console.log(req.query)
    try {
       await conexao("images").del().where({id});
       promisify(fs.unlink)(path.resolve(__dirname, "..", "tmp", "uploads", `${key}`), (err) => {
        if (err) { console.log("não foi possivel apagar o arquivo"); }
        else { console.log('aquivo deletado'); };
    })
      
       return res.json({status:true,mensagem:"apagada"})
    } catch (error) {
        console.log(error)
        return res.json({status:false,mensagem:"error ao excluir"})
    }
})

rotas.get("/selectimagesP",async (req,res)=>{
    try {
        let images=await conexao("images").where({prod:true})
        for (const key in images) {
           images[key].delete=`deleteImageP?idimage=${images[key].idimage}&key=${images[key].key}`
        }
        return res.json({status:true,images})
    } catch (error) {
        console.log(error)
        return res.json({status:false,mensagem:"error ao consultar"})
    }
})
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

export default rotas;