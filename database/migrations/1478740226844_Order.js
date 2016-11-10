'use strict';

const Schema = use('Schema');

class OrderSchema extends Schema {

  up() {
    this.create('orders', (table) => {
      table.increments();
      table.integer('item_id').references('items.id');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }

}

module.exports = OrderSchema;
