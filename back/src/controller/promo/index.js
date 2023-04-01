
import conexao from "../../databases/conexao.js";





export default {
    async Insert (req,res){ 
        let { newdesc, valpromo, id_image, id_prod}=req.body;
        
        try {
          const [id]=  await conexao("promo").insert({
                newdesc, id_prod,id_image,valpromo
            })
            
         return res.json({status:true,mensagem:"dados salvos"})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error promoção cadastro"})

        }
    },
    async Update (req,res){ 
        let { id,newdesc, valpromo, id_image, id_prod}=req.body;
        
        try {
          await conexao("promo").update({
            newdesc, valpromo, id_image, id_prod
            }).where({id})
            
            
         return res.json({status:true,mensagem:"promoção atualizada"})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error promoção update"})

        }
    },
    async Select (req,res){ 
       
        
        try {
        let promo=await conexao("promo");

        for (const key in promo) {
           promo[key].img=await conexao("images").where({id:promo[key].id_image}).first();
           promo[key].img.delete=`http://${process.env.IP_SERVER}:3009/deleteImage?id=${promo[key].img.id}&key=${promo[key].img.key}`
           promo[key].img.url=`http://${process.env.IP_SERVER}:3009/images/${promo[key].img.key}`
           promo[key].prod=await conexao("produtos").where({id:promo[key].id_prod}).first();
        //    promo[key].logos=await conexao("image_prod").where({"image_prod.id_prod":promo[key].id}).join("images","image_prod.id_image","=","images.id").select("images.*");
        //    promo[key].cat=await conexao("prod_cat").where({"prod_cat.id_prod":promo[key].id}).join("categorias","prod_cat.id_cat","=","categorias.id").select("categorias.*")
        }
          
         return res.json({status:true,promo})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error promoções select"})

        }
    },
    async Delete (req,res){ 
       
        const {id}=req.query;
        try {
       await conexao("promo").del().where({id});

        
          
         return res.json({status:true,mensagem:"apagado"})
        } catch (error) {
            
            console.log(error)
            return res.json({status:false,mensagem:"error promoções delete"})

        }
    },
}