'use strict'

class LoginController {
  // Show a login form to our user
  * create(request, response) {
    yield response.sendView('login.create');
  }

  // Respond to user trying to login
  * store(request, response) {
    // const email = request.all().email;
    // const password = request.all().password;
    const { email, password } = request.all();

    try {
      // Look up user based on their email
      // Check that users password matches the input password
      // Throw an error if user not found or password does not match
      const validLogin = yield request.auth.attempt(email, password);

      // Send a success message on the next request
      yield request.with({ success: 'You have logged in!' }).flash();

      // Redirect to the home page
      response.redirect('/');
    } catch (e) {
      // Send back the old inputs (but not the password)
      yield request.withOut('password')
        // Send back an error message
        .andWith({ error: 'Credentials do not match.' })
        // Only show the messages once
        .flash();

      // Back from whence you came!
      response.redirect('back');
    }
  }

  // Allow users to logout
  * destroy(request, response) {
    // Logout the user
    yield request.auth.logout();

    // Send an alert message
    yield request.with({ success: 'You have logged out!' }).flash();

    // Redirect to the login form
    response.redirect('/login');
  }
}

module.exports = LoginController
