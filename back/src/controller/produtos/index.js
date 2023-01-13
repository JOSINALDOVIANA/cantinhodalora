
import conexao from "../../databases/conexao.js";

import { __dirname } from "../../rotas.js";



export default {
    async Cadastro (req,res){ 
        let { desc, tam, preco, url='', und,id_image=null,logos=false,cat=false}=req.body;
        
        try {
          const [id]=  await conexao("produtos").insert({
                desc, tam, preco, url, und,id_image
            })
            if(logos && logos.length>0){
                logos=logos.map(logo=>({id_image:logo,id_prod:id}));
                await conexao("image_prod").insert(logos)
            }
            if(cat && cat.length>0){
                let cats=cat.map(item=>({id_prod:id,id_cat:item}))
                await conexao("prod_cat").insert(cats)
            }
         return res.json({status:true,mensagem:"produto salvo"})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error produtos cadastros"})

        }
    },
    async Update (req,res){ 
        let {id, desc, tam, preco, url='', und,id_image=null,logos=false,cat=false}=req.body;
        
        try {
          await conexao("produtos").update({
                desc, tam, preco, url, und,id_image
            }).where({id})
            if(logos && logos.length>0){
                logos=logos.map(logo=>({id_image:logo,id_prod:id}));
                await conexao("image_prod").delete().where({id_prod:id});
                await conexao("image_prod").insert(logos);
            }
            if(cat && cat.length>0){
                cat=cat.map(id_cat=>({id_prod:id,id_cat}));
                await conexao("prod_cat").delete().where({id_prod:id});
                await conexao("prod_cat").insert(cat);
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
           produtos[key].logos=await conexao("image_prod").where({"image_prod.id_prod":produtos[key].id}).join("images","image_prod.id_image","=","images.id").select("images.*");
           produtos[key].cat=await conexao("prod_cat").where({"prod_cat.id_prod":produtos[key].id}).join("categorias","prod_cat.id_cat","=","categorias.id").select("categorias.*")
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
       await conexao("produtos").delete().where({id});

        
          
         return res.json({status:true,mensagem:"apagado"})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error produto delete"})

        }
    },
}