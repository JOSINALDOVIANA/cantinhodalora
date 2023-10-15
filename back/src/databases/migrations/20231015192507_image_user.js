

export function up(knex) {
    return knex.schema.createTable('image_user', function (table) {
        table.increments('id');        
        table.string("id_image");  
        table.foreign('id_image').references('id').inTable('images').onDelete("cascade");
        table.integer("id_user").unsigned();
        table.foreign('id_user').references('id').inTable('users').onDelete("cascade");
        table.timestamps(true,true,true);
    });
}


export function down(knex) {
    return knex.schema.dropTable('image_user');

}
