'use strict';

const Item = use('App/Model/Item');

class ItemController {

  * index(request, response) {
    const items = yield Item.with().fetch();

    yield response.sendView('item.index', { items: items.toJSON() });
  }

  * create(request, response) {
    yield response.sendView('item.create')
  }

  * store(request, response) {
    const input = request.only('name', 'price', 'image_url');
    const item = yield Item.create(input);

    response.redirect('/store');
  }

  * show(request, response) {
    const id = request.param('id');
    const item = yield Item.with('orders').where({ id }).firstOrFail();

    response.send(item);
  }

  * update(request, response) {
    const input = request.only('name', 'item_id', 'price', 'image_url');
    const id = request.param('id');

    const item = yield Item.with('orders').where({ id }).firstOrFail();
    item.fill(input);
    yield item.save(input);

    response.send(item);
  }

  * destroy(request, response) {
    const id = request.param('id');
    const item = yield Item.query().where({ id }).firstOrFail();
    yield item.delete();

    response.status(204).send();
  }

}

module.exports = ItemController;
