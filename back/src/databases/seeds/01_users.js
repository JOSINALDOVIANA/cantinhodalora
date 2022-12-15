/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { name: 'Josinaldo viana', email:"josinaldo60@gmail.com",password:"123456",id_image:null},
   
  ]);
}
