
export function up(knex) {
    return knex.schema.createTable('promo', function (table) {
        table.increments('id');
        table.integer("id_prod").unsigned();  
        table.string("id_image");  
        table.double("valpromo").notNullable();
        table.string("newdesc").notNullable();
               
        table.foreign('id_prod').references('id').inTable('produtos'); 
        table.foreign('id_image').references('id').inTable('images'); 
        
        table.timestamp('updated_at',{ precision: 0 },{ useTz: true }).defaultTo(knex.fn.now(0));

    


    });
}


export function down(knex) {
    return knex.schema.dropTable('promo');

}