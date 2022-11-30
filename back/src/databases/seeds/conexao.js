import knex from "knex";
import bd from '../../../knexfile.js';
const conexao=knex(bd.development);
export default  conexao;