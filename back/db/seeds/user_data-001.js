/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      user_name: 'Yousuke',
      email: 'yousuke@mail',
      password: '123',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_name: 'Hioki',
      email: 'hioki@mail',
      password: '456',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_name: 'SUKE',
      email: 'suke@mail',
      password: '789',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
