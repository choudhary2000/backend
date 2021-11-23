const { USER } = require("../data/user")


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert(USER);
    });
};
