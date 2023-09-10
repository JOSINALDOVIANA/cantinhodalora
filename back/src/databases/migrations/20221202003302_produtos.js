
export function up(knex) {
    return knex.schema.createTable('produtos', function (table) {
        table.increments('id');        
        table.string('desc').notNullable();
        table.string('tam').notNullable();
        table.integer('preco').notNullable().defaultTo(0);         
        table.string('url').notNullable();         
        table.integer('und').notNullable();
        table.string('id_image').defaultTo("null");
        table.foreign('id_image').references('id').inTable('images').onDelete("SET NULL");  


    });
}


export function down(knex) {
    return knex.schema.dropTable('produtos');

}
