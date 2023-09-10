export async function seed(knex) {
  await knex('tasks').insert([
    {
      id: 1,
      name: 'CP01 trello ticket',
      completed: false,
    },
    {
      id: 2,
      name: 'CP02 trello ticket',
      completed: false,
    },
    {
      id: 3,
      name: 'WD03 trello ticket',
      completed: false,
    },
    {
      id: 4,
      name: 'WD04 trello ticket',
      completed: false,
    },
    {
      id: 5,
      name: 'WD05 trello ticket',
      completed: false,
    },
    {
      id: 6,
      name: 'THS01 trello ticket',
      completed: true,
    },
    {
      id: 7,
      name: 'THS02 trello ticket',
      completed: true,
    },
    {
      id: 8,
      name: 'THS03 trello ticket',
      completed: true,
    },
    {
      id: 9,
      name: 'THS04 trello ticket',
      completed: true,
    },
    {
      id: 10,
      name: 'THS05 trello ticket',
      completed: true,
    },
    {
      id: 11,
      name: 'THS06 trello ticket',
      completed: true,
    },
  ])
}
