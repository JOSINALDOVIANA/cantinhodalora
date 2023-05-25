import conexao from "../../databases/conexao.js";

export default {
    async insert(req, res) {
        let { cats } = req.body;
        try {
            await conexao("categorias").insert(cats.map(c => ({ desc: c })))
            return res.json({ status: true, mensagem: "inseridos" })
        } catch (error) {
            console.log('error insert categorias')
            return res.json({ status: false, mensage: "error insert categorias" })
        }
    },
    async select(req, res) {
          const {id=false}=req.query
        try {
            if(id){
                let produtos= await conexao("prod_cat").where({"prod_cat.id_cat":id}).join("produtos","produtos.id","=","prod_cat.id_prod")
                for (const key in produtos) {
                    produtos[key].img=await conexao("images").where({id:produtos[key].id_image}).first();
                    if(!!produtos[key].img){
                        produtos[key].img.url=process.env.IP_SERVER+":3009/images/"+produtos[key].img.key;
                        produtos[key].url ="http://"+process.env.IP_SERVER+":3009/images/"+produtos[key].img.key                                           
                    }
                    produtos[key].logos=await conexao("image_prod").where({"image_prod.id_prod":produtos[key].id}).join("images","image_prod.id_image","=","images.id").select("images.*");
                    if(!!produtos[key].logos){
                        for (const key2 in produtos[key].logos) {
                            produtos[key].logos[key2].url=process.env.IP_SERVER+":3009/images/"+ produtos[key].logos[key2].key
                        }
                    }
                 }
                return res.json({status:true,produtos})
            }

            return res.json({status:true,categorias:await conexao("categorias")})
        } catch (error) {
            console.log('error insert categorias')
            return res.json({ status: false, mensage: "error insert categorias" })
        }
    },

}