'use strict';

const Schema = use('Schema');

class ItemSchema extends Schema {

  up() {
    this.create('items', (table) => {
      table.increments();
      table.string('name');
      
      table.integer('price');
      table.string('image_url');
      table.timestamps();
    });
  }

  down() {
    this.drop('items');
  }

}

module.exports = ItemSchema;
