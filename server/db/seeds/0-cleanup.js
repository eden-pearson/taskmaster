export async function seed(knex) {
  await knex('tasks').del()
}
