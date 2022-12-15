
export function up(knex) {
    return knex.schema.createTable('image_prod', function (table) {
        table.increments("id");
        
        table.string('id_image').defaultTo("null");
        table.foreign('id_image').references('id').inTable('images').onDelete("cascade");       
        table.integer("id_prod").unsigned();        
        table.foreign("id_prod").references("id").inTable("produtos").onDelete("cascade");         
        


    });
}


export function down(knex) {
    return knex.schema.dropTable('image_prod');

}