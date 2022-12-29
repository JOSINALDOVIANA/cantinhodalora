
export function up(knex) {
    return knex.schema.createTable('prod_cat', function (table) {
        table.increments('id');        
        
        table.integer("id_cat").unsigned();  
        table.foreign('id_cat').references('id').inTable('categorias').onDelete("cascade");  
        table.integer("id_prod").unsigned();  
        table.foreign('id_prod').references('id').inTable('produtos').onDelete("cascade");  


    });
}


export function down(knex) {
    return knex.schema.dropTable('prod_cat');

}
