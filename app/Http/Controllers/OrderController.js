'use strict'

const Order = use('App/Model/Order')

class OrderController {

  * index(request, response) {
    const orders = yield request.currentUser.orders().with('user', 'item').fetch()

    yield response.sendView('order.index', { orders: orders.toJSON() });
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const item_id = request.param('id');
    const user_id = request.currentUser.id;

    yield Order.create({ item_id, user_id });

    response.redirect('/my-orders')
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = OrderController
