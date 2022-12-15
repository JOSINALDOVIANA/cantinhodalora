
export function up(knex) {
    return knex.schema.createTable('images', function (table) {
        table.string('id').primary();

        table.string('name').notNullable();
        table.string('size').notNullable();
        table.string('key').notNullable();
        table.string('url').notNullable();
        table.boolean('prod').defaultTo('false');

    


    });
}


export function down(knex) {
    return knex.schema.dropTable('images');

}
