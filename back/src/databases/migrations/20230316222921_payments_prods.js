/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */




export function up(knex) {
    return knex.schema.createTable('payments_prods', function (table) {
        table.increments("id");


        
        
        table.integer("id_payments").unsigned();  
        table.foreign('id_payments').references('id').inTable('payments'); 
        table.integer("id_prods").unsigned();  
        table.foreign('id_prods').references('id').inTable('produtos'); 
       
        
    


    });
}


export function down(knex) {
    return knex.schema.dropTable('payments_prods');

}
