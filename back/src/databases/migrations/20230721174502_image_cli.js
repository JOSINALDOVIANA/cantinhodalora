

export function up(knex) {
    return knex.schema.createTable('image_cli', function (table) {
        table.increments('id');        
        table.string("id_image");  
        table.foreign('id_image').references('id').inTable('images').onDelete("cascade");
        table.integer("id_cli").unsigned();
        table.foreign('id_cli').references('id').inTable('clientes').onDelete("cascade");
        table.timestamps(true,true,true);
    });
}


export function down(knex) {
    return knex.schema.dropTable('image_cli');

}
