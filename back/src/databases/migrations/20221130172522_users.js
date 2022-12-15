
export function up(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments("id");
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.boolean('status').defaultTo('true');
        table.string('id_image').defaultTo("null");
        table.foreign('id_image').references('id').inTable('images').onDelete("SET NULL");      
        


    });
}


export function down(knex) {
    return knex.schema.dropTable('users');

}