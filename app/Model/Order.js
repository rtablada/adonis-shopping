'use strict'

const Lucid = use('Lucid')

class Order extends Lucid {


  item() {
    return this.belongsTo('App/Model/Item', 'id', 'item_id');
  }
  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Order
