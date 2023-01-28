import conexao from "../../databases/conexao.js"

export default {
 

 async Select(req,res){
   const {id=false}=req.query;
    try {
        let  dados;
        if(!!id){
            dados=await conexao("cols").where({id});
        }else{
            dados=await conexao("cols");
        }
        
        return res.json({status:true,cols:dados})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error select cols"})
    }
 },
 async Update(req,res){
    const {id,name}=req.body;
    try {
        await conexao("cols").where({id}).update({name});
        
        return res.json({status:true,mensagem:"Dados salvos"})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error update cols"})
    }
 },
 async Insert(req,res){
    const {name}=req.body;
    try {
       const [id]= await conexao("cols").insert({name});
        
        return res.json({status:true,mensagem:"Dados salvos",dados:{id,name}})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error Insert cols"})
    }
 },
 async Delete(req,res){
    const {id}=req.query;
    try {
        await conexao("cols").del().where({id});
        
        return res.json({status:true,mensagem:"Dados salvos"})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error delete cols"})
    }
 },
 

}