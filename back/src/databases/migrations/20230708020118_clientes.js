
export function up(knex) {
    return knex.schema.createTable('clientes', function (table) {
        table.increments('id');        
        table.string("name");
        table.string("cpf").notNullable();
        table.string("endereco").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("bairro").notNullable();
        table.string("cidade").notNullable();
        table.string("telefone").notNullable();
        table.string("nascimento").notNullable();
        table.string("ncart").defaultTo(null);
        table.string('validadecart').defaultTo(null)
        table.string("cvc").defaultTo(null);
        table.timestamps(true,true,true);
    });
}


export function down(knex) {
    return knex.schema.dropTable('clientes');

}
