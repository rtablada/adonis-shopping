const nodemon = require('nodemon');
const tinylr = require('tiny-lr');

// standard LiveReload port
const lrPort = 35729;
let restartLR;

// tinylr(opts) => new tinylr.Server(opts);
const server = tinylr();

server.listen(lrPort, function() {
  console.log('... Listening on %s ...', lrPort);
});

nodemon({
  script: 'server.js',
  ext: 'js json njk css',
  watch: [
    'resources/views',
    'config',
    'public',
    'bootstrap',
    'app',
    '.env'
  ]
});

nodemon.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit(0);
}).on('restart', function (files) {
  setTimeout(() => {
    console.log('App reloaded due to: ', files);
    server.notifyClients(files);
  }, 2000);
});
