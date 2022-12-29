
export function up(knex) {
    return knex.schema.createTable('categorias', function (table) {
        table.increments('id');        
        table.string('desc').notNullable();
          


    });
}


export function down(knex) {
    return knex.schema.dropTable('categorias');

}
