import conexao from "../../databases/conexao.js"

export default {
    async Login (req,res){
        let {email,password:senha}=req.body
        console.log(req.body)
        try {
           let dados=await conexao("clientes").where({email,senha}).first();

        if(!!dados){
            dados.image=await conexao("images").where({id:dados.id_image}).first()
            dados.image.url=`http:${process.IP_SERVER}/images+${dados.image.key}`
            return res.json({status:true,dados})
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
        let {nome,cpf,endereco,cidade,bairro,telefone,nascimento,ncart,validadecart,cvc,email,senha}=req.body
        try {
           await conexao("clientes").insert({nome,cpf,endereco,cidade,bairro,telefone,nascimento,ncart,validadecart,cvc,email,senha});

       
            return res.json({status:true,mensagem:"salvo"})
        
        } catch (error) {
            console.log(error)
            return res.json({status:false,mensagem:"verifique os dados digitados e tente novamente"})
        }
    }
}