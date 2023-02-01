import conexao from "../../databases/conexao.js"

export default {
 

 async Select(req,res){
   const {id=false,id_col=false,id_users=false,id_close_col=false}=req.query;
    try {
        let  dados=[];
        if(!!id){
            dados=await conexao("close").where({id}).first();
            dados.gerente=await conexao("users").where({"id":dados.id_users}).first();
            dados.colaborador=await conexao("cols").where({"id":dados.id_col}).first();
            dados.FCcolaborador=await conexao("close_col").where({"id":dados.id_close_col}).first();
            return res.json({status:true,close:dados})

        }
        if(!!id_col){
            dados=await conexao("close").where({id_col});
            let col= await conexao("cols").where({"id":id_col}).first();
            for (const index in dados) {
               dados[index].gerente= await conexao("users").where({"id":dados[index].id_users}).first();
               dados[index].colaborador=col;
               dados[index].FCcolaborador=await conexao("close_col").where({"id":dados[index].id_close_col}).first();
            }
            return res.json({status:true,close:dados})

        }
        if(!!id_users){
            dados=await conexao("close").where({id_users});
            let ger=await conexao("users").where({"id":dados[index].id_users}).first();
            for (const index in dados) {
               dados[index].gerente=ger ;
               dados[index].colaborador=await conexao("cols").where({"id":dados[index].id_col}).first();
               dados[index].FCcolaborador=await conexao("close_col").where({"id":dados[index].id_close_col}).first();
            }
            return res.json({status:true,close:dados})

        }
        if(!!id_close_col){
            dados=await conexao("close").where({id_close_col}).first();
            
            
               dados.gerente=await conexao("users").where({"id":dados.id_users}).first(); ;
               dados.colaborador=await conexao("cols").where({"id":dados.id_col}).first();
               dados.FCcolaborador=await conexao("close_col").where({"id":dados.id_close_col});
            
               return res.json({status:true,close:dados})

        }



        
        return res.json({status:true,close: await conexao("close")})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error select close"})
    }
 },
 async Update(req,res){
    const {id,id_users,id_col,id_close_col,valconf,valdesv,valgast,valsald}=req.body;
    try {
        await conexao("close").where({id}).update({id_users,id_col,id_close_col,valconf,valdesv,valgast,valsald});
        
        return res.json({status:true,mensagem:"Dados salvos"})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error update close"})
    }
 },
 async Insert(req,res){
    const {id_users,id_col,id_close_col,valconf,valdesv,valgast,valsald}=req.body;
    try {
       const [id]= await conexao("close").insert({id_users,id_col,id_close_col,valconf,valdesv,valgast,valsald});
        
        return res.json({status:true,mensagem:"Dados salvos",dados:{id,id_users,id_col,id_close_col,valconf,valdesv,valgast,valsald}})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error Insert close"})
    }
 },
 async Delete(req,res){
    const {id}=req.query;
    try {
        await conexao("close").del().where({id});
        
        return res.json({status:true,mensagem:"Dados salvos"})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error delete close"})
    }
 },
 

}