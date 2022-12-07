import knex from "knex";
import {development} from '../../knexfile.js';
const conexao=knex(development);
export default  conexao;