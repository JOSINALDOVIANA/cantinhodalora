
export function up(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments("id");
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.boolean('status').defaultTo('true');
        // table.timestamp('created_at',{ precision: 6 },{ useTz: true }).defaultTo(knex.fn.now(6));
        // table.timestamp('updated_at',{ precision: 0 },{ useTz: true }).defaultTo(knex.fn.now(0));
        // table.string('dia');
        // table.string('mes');
        // table.string('ano');


    });
}


export function down(knex) {
    return knex.schema.dropTable('users');

}