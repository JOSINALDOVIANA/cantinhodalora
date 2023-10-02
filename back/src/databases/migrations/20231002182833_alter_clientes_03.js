/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.alterTable("clientes",(table)=>{
        table.dropForeign("id_image");
        
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
     return knex.schema.alterTable("clientes",function(table){
        table.foreign('id_image').references('id').inTable('images');
  })
  }
  