
import conexao from "../../databases/conexao.js";

import axios from "axios";




export default {
    async Insert(req, res) {

        let { idp = 0, id_user = "", id_external = "", url_payment = '', status = "pending", val_payment = 0, obj = false } = req.body;
        let resposta;

        try {
            if (!!obj) {
                let ids_prod = obj.items.map(({ id }) => (id));
                let items = obj.items.map((item) => {

                    val_payment = val_payment + (item.unit_price * item.quantity)

                    return ({
                        title: item.title,
                        quantity: item.quantity,
                        currency_id: item.currency_id,
                        unit_price: item.unit_price,
                        picture_url: item.picture_url
                    })
                })
                obj.items = items;

                const [id] = await conexao("payments").insert({
                    id_user, id_external, url_payment, val_payment, status
                })
                idp = id;

                obj.external_reference = id;

                if (ids_prod && ids_prod.length > 0) {
                    ids_prod = ids_prod.map(prod => ({ id_prods: prod, id_payments: id }));
                    await conexao("payments_prods").insert(ids_prod);
                }

                resposta = await axios.post("https://api.mercadopago.com/checkout/preferences?access_token=APP_USR-7893233712998988-030800-59ce86268e2637073d05aaabd00a8a64-213707645", { ...obj })
                // .then(async (r)=>{
                //     url_payment=r.data.sandbox_init_point;
                //     await conexao("payments").update({url_payment}).where({id});  
                //     return_dados={
                //         id:idp, id_user, id_external , url_payment , status, val_payment, obj
                //     }






                // }):

                url_payment = resposta.data.sandbox_init_point;
                await conexao("payments").update({ url_payment }).where({ id });



            }






            return res.json({
                status: true,
                venda: { id: idp, id_user, id_external, url_payment, status, val_payment, obj },
                returnmercado: resposta.data
            })
        } catch (error) {

            console.log(error)
            return res.json({ status: false, mensagem: "error payments insert" })

        }
    },
    async Insert2(req, res) {

        let { data } = req.body;
       

        try {
            const resposta = await axios.get(`https://api.mercadopago.com/v1/payments/${data.id}?access_token=APP_USR-7893233712998988-030800-59ce86268e2637073d05aaabd00a8a64-213707645`)

            if (resposta.data.status == "approved") {
                await conexao("payments").update({
                    status: resposta.data.status,
                    date_payment: new Date(),
                    id_external: data.id
                }).where({
                    id: resposta.data.external_reference,

                })
            }

            return res.json({ status: true, payment: await conexao("payments").where({ id:resposta.data.external_reference}) })
        } catch (error) {

            console.log(error)
            return res.json({ status: false, mensagem: "error payments insert2" })

        }
    },
    async Select(req, res) {
        let { id } = req.query
        try {
            if (!!id) {
                let vd = await conexao("payments").where({ id }).first();
                vd.prods = await conexao("payments_prods").where({ "payments_prods.id_payments": id })
                    .join("produtos", "produtos.id", "=", "payments_prods.id_prods").select("*")

                return res.json({ status: true, payments: vd });
            }
            return res.json({ status: true, payments: await conexao("payments") });
        } catch (error) {
            console.log(error)
            return res.json({ status: false, error: "error payments select" })
        }
    },
    async DEL(req, res) {
        const { id } = req.query
        try {
            const venda = await conexao("payments").where({ id });
            await conexao("payments_prods").del().where({ id_payments: id })
            await conexao("payments").del().where({ id })

            return res.json({ status: true, delete: venda })
        } catch (error) {
            console.log(error)
            return res.json({ status: false, error: "error payments delete" })
        }
    }


}