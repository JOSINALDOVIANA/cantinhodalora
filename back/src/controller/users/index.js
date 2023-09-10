import conexao from "../../databases/conexao.js"

export default {
 
 async Login(req,res){
    const {email,password}=req.body;
    try {
        let dados=await conexao("users").where({email,password}).first();
        if(!!dados) {
            if(!!dados.id_image){
                dados.img=await conexao("images").where({"id":dados.id_image}).first()
                if(!!dados.img){
                    dados.img.delete=`http://${process.env.IP_SERVER}:3009/deleteImage?id=${dados.img.id}&key=${dados.img.key}`
                    dados.img.url=`http://${process.env.IP_SERVER}:3009/images/${dados.img.key}`;
                }
            }
            return res.json({status:true,user:dados})
        }else{
        return res.json({status:false,mensagem:"error nos dados por favor verifique-os e tente novamente!!"})}
    } catch (error) {
        console.error(error)
        return res.json({status :false, mensagem:"error login users"})
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
    const {id,email,password,name,id_image=null}=req.body;
    try {
        await conexao("users").where({id}).update({email,password,name,id_image});
        
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