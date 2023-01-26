import conexao from "../../databases/conexao.js"

export default {
 
 async login(req,res){
    const {email,password}=req.body;
    try {
        const dados=await conexao("users").where({email,password}).first();
        if(!!dados) {return res.json({status:true,user:dados})}else{
        return res.json({status:false,mensagem:"error nos dados por favor verifique-os e tente novamente!!"})}
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error select users"})
    }
 },
 async Update(req,res){
    const {id,email,password,name}=req.body;
    try {
        await conexao("users").where({id}).update({email,password,name});
        
        return res.json({status:true,mensagem:"Dados salvos"})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error update users"})
    }
 },
 async Insert(req,res){
    const {email,password,name}=req.body;
    try {
       const [id]= await conexao("users").insert({email,password,name});
        
        return res.json({status:true,mensagem:"Dados salvos",dados:{id,name,email,password}})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error Insert users"})
    }
 },
 

}