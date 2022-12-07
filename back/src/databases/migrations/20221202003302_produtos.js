
export function up(knex) {
    return knex.schema.createTable('produtos', function (table) {
        table.increments('id');

        table.string('desc').notNullable();
        table.string('tam').notNullable();
        table.string('preco').notNullable();
        table.string('url').notNullable();
        table.integer('und').notNullable();
        


    });
}


export function down(knex) {
    return knex.schema.dropTable('produtos');

}
