
export function up(knex) {
    return knex.schema.createTable('close', function (table) {
        table.increments('id');
        table.integer("id_users").unsigned();  
        table.integer("id_col").unsigned();  
        table.integer("id_close_col").unsigned();  
        table.integer('valconf').notNullable();
        table.integer('valdesv').notNullable();
        table.integer('valgast').notNullable();
        table.integer('valsald').notNullable();        
        table.foreign('id_users').references('id').inTable('users'); 
        table.foreign('id_col').references('id').inTable('cols'); 
        table.foreign('id_close_col').references('id').inTable('close_col'); 
        table.timestamp('updated_at',{ precision: 0 },{ useTz: true }).defaultTo(knex.fn.now(0));

    


    });
}


export function down(knex) {
    return knex.schema.dropTable('close');

}