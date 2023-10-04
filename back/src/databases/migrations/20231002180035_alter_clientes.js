/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.alterTable("clientes",(table)=>{
        
        // table.string("cpf").notNullable().unique().alter();
        table.string("cpf").notNullable().unique().alter();
        table.string("email").notNullable().unique().alter();
        table.string("telefone").notNullable().unique().alter();
        
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
     return knex.schema.alterTable("clientes",function(table){
        table.string("cpf").notNullable().alter();
        table.string("email").notNullable().alter();
        table.string("telefone").notNullable().alter();
     
  })
  }
  