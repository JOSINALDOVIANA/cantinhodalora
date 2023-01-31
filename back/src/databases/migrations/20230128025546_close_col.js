
export function up(knex) {
    return knex.schema.createTable('close_col', function (table) {
        table.increments('id');
        table.integer("id_col").unsigned();  
        table.integer('valcart').notNullable();
        table.integer('valdin').notNullable();
        table.integer('valcom').notNullable();
        table.integer('valtotal').notNullable();        
        table.foreign('id_col').references('id').inTable('cols'); 
        table.timestamp('updated_at',{ precision: 0 },{ useTz: true }).defaultTo(knex.fn.now(0));

    


    });
}


export function down(knex) {
    return knex.schema.dropTable('close_col');

}

