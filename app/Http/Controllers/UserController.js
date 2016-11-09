'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {
  * create(request, response) {
    yield response.sendView('user.create')
  }

  * store(request, response) {
    // Grabbing inputs
    const { username, email, password } = request.all();

    try {
      // Save the user
      const user = yield User.create({
        username,
        email,
        password: yield Hash.make(password),
      });

      // Login the current user
      yield request.auth.login(user);

      // Give them a success message
      yield request.with({ success: 'Congrats on your new account!' }).flash();
      // Redirect them to the main site
      response.redirect('/');
    } catch (e) {
      console.log(e);
      yield request
        .withOut('password') // shows us the old input values (except the password field)
        .andWith({ error: 'That username or email is already taken' }) // adds a message back
        .flash(); // Makes this data only last for one request

      response.redirect('back');
    }
  }

  * storeWithoutYield(request, response) {
    // Grabbing inputs
    const { username, email, password } = request.all();

    User.create({
      username,
      email,
      password: yield Hash.make(password),
    }).then((user) => {
      return request.auth.login(user);
    }).then(() => {
      return request.with({
        success: 'Congrats on your new account!',
      }).flash();
    }).then(() => {
      response.redirect('/');
    }).catch(() => {
      request
        .withOut('password') // shows us the old input values (except the password field)
        .andWith({ error: 'That username or email is already taken' }) // adds a message back
        .flash().then(() => {
          response.redirect('back');
        });
    });
  }
}

module.exports = UserController
