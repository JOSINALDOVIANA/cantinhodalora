import conexao from "../../databases/conexao.js"
import bcryptjs from 'bcryptjs'
import JWT from 'jsonwebtoken'
import authConfig from "../auth/auth.js"
export default {
    async GetClientes(req,res){
        
        try {
            let user_serialize=[]
           let user=await conexao("clientes");
           for (let value of !!user?user:[]) {
            if(!!value.id_image){
                value.img=await conexao("images").where({id:value.id_image}).first();
                if(!!value.img){value.img.url=`http://${process.env.IP_SERVER}:3009/images/${value.img.key}`}
            }
            user_serialize.push(value)
           }
        
        return res.json({status:true,user:user_serialize})
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
    },
    async Login (req,res){
        let {email,password}=req.body
        
        try {
           let user=await conexao("clientes").where({email}).first();

           if(!user){
            return res.status(200).json({status:false,mensagem:"ERRO!! verifique os dados e tente Novamente"})
           }

           if(!await bcryptjs.compare(password,user.password)){
            return res.status(200).json({status:false,mensagem:"ERRO!! verifique os dados enviados"})
           }

           const token = JWT.sign({},authConfig.jwt.secret,{
            subject:`${user.id}`,
            expiresIn:authConfig.jwt.expiresIn
        })

          delete user["password"]

          

        if(!!user.id_image){
            user.img=await conexao("images").where({id:user.id_image}).first()
            if(!!user.img){user.img.url=`http://${process.env.IP_SERVER}:3009/images/${user.img.key}`}
            // return res.status(200).json({status:true,user:{...user,token}})
        }

        return res.status(200).json({status:true,user:{...user,token}})
        
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
    },
    async Insert (req,res){
        let {name,cpf,endereco,cidade,bairro,telefone,nascimento,ncart=null,validadecart=null,cvc=null,email,password,id_image=""}=req.body
        password= await bcryptjs.hash(password,8)
        try {
           await conexao("clientes").insert({name,cpf,endereco,cidade,bairro,telefone,nascimento,ncart,validadecart,cvc,email,password,id_image});

       
            return res.json({status:true,mensagem:"salvo"})
        
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
    },
    async Update (req,res){
        let {id,name,cpf,endereco,cidade,bairro,telefone,nascimento,ncart=null,validadecart=null,cvc=null,email,password,id_image=""}=req.body
        password=await bcryptjs.hash(password,8)
        try {
           await conexao("clientes").where({id}).update({name,cpf,endereco,cidade,bairro,telefone,nascimento,ncart,validadecart,cvc,email,password,id_image});

       
            return res.json({status:true,mensagem:"atualizado"})
        
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
    },
    async Delete (req,res){
        let {id,email,password}=req.body
        
        try {
           await conexao("clientes").where({id,password,email}).del()

       
            return res.json({status:true,mensagem:"Dados Apagados"})
        
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
    }
}