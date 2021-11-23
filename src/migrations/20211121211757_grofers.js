
exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
        table.increments('id').primary().index(),
        table.text('name', 100).notNullable(),
        table.enu('status', ['DECLARED', 'NOT_DECLARED', 'INVALID']).notNullable().default('NOT_DECLARED').index(),
        table.enu('type', ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'BIG']).notNullable().default('RANDOM').index(),
        table.integer('winners').notNullable(),
        table.integer('limits').notNullable(),
        table.timestamp('event_date').default(knex.fn.now()).index()
    })
    .createTable('users', table => {
        table.text('email').primary().notNullable(),
        table.enu('role', ['USER', 'ADMIN']).notNullable().default('USER')
    })
    .createTable('tickets', table => {
        table.integer('event_id').notNullable().references('id').inTable('events'),
        table.text('ticket_no').notNullable(),
        table.enu('ticket_state', ['SOLD', 'NOT_SOLD']).notNullable().default('NOT_SOLD'),
        table.unique(['event_id', 'ticket_no'])
    })
    .createTable('rewards', table => {
        table.integer('event_id').notNullable().references("id").inTable("events"),
        table.integer("rank").notNullable(),
        table.text('reward').notNullable()
    })
    .createTable('participations', (table) => {
        table.integer('event_id').index(),
        table.text('email').index(),
        table.text('ticket').notNullable(),
        table.unique(["event_id", "email"]),
        table.foreign('email').references('users.email'),
        table.foreign('event_id').references('events.id')
    })
    .createTable('winners', (table) => {
        table.integer('event_id').notNullable(),
        table.integer('rank').notNullable().default(0),
        table.text('ticket').notNullable(),
        table.foreign('event_id').references('events.id'),
        table.unique(['event_id', 'rank'])
    });
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('winners')
  .dropTable('tickets')
  .dropTable('participations')
  .dropTable('rewards')
  .dropTable('users')
  .dropTable('events')
};
