/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */




export function up(knex) {
    return knex.schema.createTable('payments', function (table) {
        table.increments("id");

        table.string('id_user').notNullable();
        table.string('id_external');
        table.string('status');
        table.string('url_payment').notNullable();
        table.double('val_payment');
        table.timestamp('date_initial',{ precision: 0 },{ useTz: true }).defaultTo(knex.fn.now(0));
        table.datetime('date_payment', { precision: 6 });

    


    });
}


export function down(knex) {
    return knex.schema.dropTable('payments');

}
