import conexao from "../../databases/conexao.js"

export default {
 async select(req,res){
    try {
        return res.json({status:true,users:await conexao("users")})
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error select users"})
    }
 },
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

}