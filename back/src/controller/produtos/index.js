import  fs  from "fs";
import conexao from "../../databases/conexao.js";
import path from "path";
import { __dirname } from "../../rotas.js";
import { promisify } from "util";


export default {
    async Cadastro (req,res){ 
        let { desc, tam, preco, url='', und,id_image=null,logos=false}=req.body;
        
        try {
          const [id]=  await conexao("produtos").insert({
                desc, tam, preco, url, und,id_image
            })
            if(logos && logos.length>0){
                logos=logos.map(logo=>({id_image:logo,id_prod:id}));
                await conexao("image_prod").insert(logos)
            }
         return res.json({status:true,mensagem:"produto salvo"})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error produtos cadastros"})

        }
    },
    async Update (req,res){ 
        let {id, desc, tam, preco, url='', und,id_image=null,logos=false}=req.body;
        
        try {
          await conexao("produtos").update({
                desc, tam, preco, url, und,id_image
            }).where({id})
            if(logos && logos.length>0){
                logos=logos.map(logo=>({id_image:logo}));
                await conexao("image_prod").update(logos).where({id_prod:id})
            }
         return res.json({status:true,mensagem:"produto atualizado"})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error produtos update"})

        }
    },
    async Select (req,res){ 
       
        
        try {
        let produtos=await conexao("produtos");

        for (const key in produtos) {
           produtos[key].img=await conexao("images").where({id:produtos[key].id_image}).first();
           produtos[key].logos=await conexao("image_prod").where({"image_prod.id_prod":produtos[key].id}).join("images","image_prod.id_image","=","images.id").select("images.*")
        }
          
         return res.json({status:true,produtos})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error produtos select"})

        }
    },
    async Delete (req,res){ 
       
        const {id}=req.query;
        try {
       await conexao("produtos").delete({id});

        
          
         return res.json({status:true,mensagem:"apagado"})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error produto delete"})

        }
    },
}