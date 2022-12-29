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
                    produtos[key].logos=await conexao("image_prod").where({"image_prod.id_prod":produtos[key].id}).join("images","image_prod.id_image","=","images.id").select("images.*");
                    // produtos[key].cat=await conexao("prod_cat").where({"prod_cat.id_prod":produtos[key].id}).join("categorias","prod_cat.id_cat","=","categorias.id").select("categorias.*")
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