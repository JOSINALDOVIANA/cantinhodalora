
exports.up = function(knex) {
    return knex.schema.createTable('images', function (table) {
        table.string('idimage').primary().notNullable();

        table.string('name').notNullable();
        table.string('size').notNullable();
        table.string('key').notNullable();
        table.string('url').notNullable();
        // table.timestamp('created_at',{ precision: 6 },{ useTz: true }).defaultTo(knex.fn.now(6));
        // table.timestamp('updated_at',{ precision: 0 },{ useTz: true }).defaultTo(knex.fn.now(0));
        // table.string('dia');
        // table.string('mes');
        // table.string('ano');


    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('fotos');

};
