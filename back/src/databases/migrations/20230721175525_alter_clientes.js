/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable("clientes",(table)=>{
    table.string("id_image").defaultTo("null");  
    table.foreign('id_image').references('id').inTable('images');
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
   return knex.schema.alterTable("clientes",function(table){
        table.dropForeign("id_image")        
        table.dropColumns(["id_mage"]);
})
}
