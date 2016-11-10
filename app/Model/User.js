'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  orders() {
    return this.hasMany('App/Model/Order');
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = User
