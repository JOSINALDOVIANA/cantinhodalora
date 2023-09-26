import conexao from "../../databases/conexao.js"

export default {
    async Login (req,res){
        let {email,password}=req.body
        // console.log(req.body)
        try {
           let user=await conexao("clientes").where({email,password}).first();

        if(!!user){
            user.img=await conexao("images").where({id:user.id_image}).first()
            user.img.url=`http://${process.env.IP_SERVER}:3009/images/${user.img.key}`
            return res.json({status:true,user})
        }
        else{
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
    },
    async Insert (req,res){
        let {nome,cpf,endereco,cidade,bairro,telefone,nascimento,ncart=null,validadecart=null,cvc=null,email,password,id_image=""}=req.body
        try {
           await conexao("clientes").insert({nome,cpf,endereco,cidade,bairro,telefone,nascimento,ncart,validadecart,cvc,email,password,id_image});

       
            return res.json({status:true,mensagem:"salvo"})
        
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
    },
    async Update (req,res){
        let {id,nome,cpf,endereco,cidade,bairro,telefone,nascimento,ncart=null,validadecart=null,cvc=null,email,password,id_image=""}=req.body
       
        try {
           await conexao("clientes").where({id}).update({nome,cpf,endereco,cidade,bairro,telefone,nascimento,ncart,validadecart,cvc,email,password,id_image});

       
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