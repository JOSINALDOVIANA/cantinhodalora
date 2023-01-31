import conexao from "../../databases/conexao.js"

export default {
 

 async Select(req,res){
   const {id=false,id_col=false}=req.query;
    try {
        let  dados=[];
        if(!!id){
            dados=await conexao("close_col").where({id});
        }
        if(!!id_col){
            dados=await conexao("close_col").where({id_col});
        }



        
        return res.json({status:true,cols:dados})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error select close_col"})
    }
 },
 async Update(req,res){
    const {id,id_col,valcart,valdin,valcom,valtotal,valsaldo}=req.body;
    try {
        await conexao("close_col").where({id}).update({id_col,valcart,valdin,valcom,valtotal,valsaldo});
        
        return res.json({status:true,mensagem:"Dados salvos"})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error update close_col"})
    }
 },
 async Insert(req,res){
    const {id_col,valcart,valdin,valcom,valtotal,valsaldo}=req.body;
    try {
       const [id]= await conexao("close_col").insert({id_col,valcart,valdin,valcom,valtotal,valsaldo});
        
        return res.json({status:true,mensagem:"Dados salvos",dados:{id,id_col,valcart,valdin,valcom,valtotal,valsaldo}})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error Insert close_cols"})
    }
 },
 async Delete(req,res){
    const {id}=req.query;
    try {
        await conexao("close_col").del().where({id});
        
        return res.json({status:true,mensagem:"Dados salvos"})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error delete close_col"})
    }
 },
 

}