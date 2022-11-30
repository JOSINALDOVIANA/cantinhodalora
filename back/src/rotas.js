import express from  "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Crypto from 'crypto';

import { fileURLToPath } from 'url';
import knex from "knex";
import conexao from "./databases/seeds/conexao.js";
import users from "./controller/users/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rotas=express.Router();


// #####################IMAGENS############################

rotas.post("/uploadImage",
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
    // url=`http://localhost:3001/images/${key}`
        const idimage = `${Crypto.randomBytes(12).toString('HEX')}`;

        try {
            await conexao('images').insert({
                idimage,
                name,
                size,
                key,
                url,
                
            });
            res.json({
                idimage, name, size, key, url
            });
        } catch (error) {
            console.error(error)
            return res.json({status:false,mensagem:"error"
            })
        }
 
}
)

rotas.delete("/deleteImage",async(req,res)=>{
    const {idimage,key}=req.query
    // console.log(req.query)
    try {
       await conexao("images").del().where({idimage});
       fs.unlink(path.resolve(__dirname,"..","tmp","uploads",`${key}`),(err) => {
       if (err) {console.log("não foi possivel apagar o arquivo")}
       else {console.log('path/file.txt was deleted')};
      })
      
       return res.json({status:true,mensagem:"apagada"})
    } catch (error) {
        console.log(error)
        return res.json({status:false,mensagem:"error ao excluir"})
    }
})

rotas.get("/imagesget",async (req,res)=>{
    try {
        let images=await conexao("images")
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

// #####################USERS###############################

// rotas.get("/users",users.select);
rotas.post("/login",users.login);



// ###########################################################



export default rotas;