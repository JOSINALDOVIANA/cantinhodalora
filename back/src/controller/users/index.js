import conexao from "../../databases/conexao.js";
import bcryptjs from 'bcryptjs'
import  JWT from "jsonwebtoken";
import authConfig from "../auth/auth.js"; 

export default {
 
 async Login(req,res){
   let {email,password}=req.body;
   

    try {
        let dados=await conexao("users").where({email}).first();

        if(!dados){
            return res.status(200).json({status:false,mensagem:"verifique os dados digitados"})
        }

        if(!await bcryptjs.compare(password,dados.password)){
            return res.status(200).json({status:false,mensagem:"verifique os ados digitados e tente novamente"})
        }

        if(!!dados.id_image){
            dados.img=await conexao("images").where({"id":dados.id_image}).first()
            if(!!dados.img){
                dados.img.delete=`http://${process.env.IP_SERVER}:3009/deleteImage?id=${dados.img.id}&key=${dados.img.key}`
                dados.img.url=`http://${process.env.IP_SERVER}:3009/images/${dados.img.key}`;
            }
        }

        const token = JWT.sign({},authConfig.jwt.secret,{
            subject:`${dados.id}`,
            expiresIn:authConfig.jwt.expiresIn
        })

        delete dados["password"];
            
            return res.status(200).json({status:true,user:{...dados,token}})
        
    } catch (error) {
        console.error(error)
        return res.status(200).json({status :false, mensagem:"error login users"})
    }
 },
 async Select(req,res){
   
    try {
        const dados=await conexao("users");
        return res.json({status:true,users:dados})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error select users"})
    }
 },
 async Update(req,res){
    let {id,email,password,name,id_image=null}=req.body;
    password=await bcryptjs.hash(password,8);
    try {
        await conexao("users").where({id}).update({email,password,name,id_image});
        
        return res.json({status:true,mensagem:"Dados salvos"})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error update users"})
    }
 },
 async Insert(req,res){
    let {email,password,name}=req.body;
    password=await bcryptjs.hash(password,8);
    try {
       const [id]= await conexao("users").insert({email,password,name});
        
        return res.json({status:true,mensagem:"Dados salvos",dados:{id,name,email,password}})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error Insert users"})
    }
 },
 

}