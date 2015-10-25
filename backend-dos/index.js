var Hapi = require('hapi');
var server = new Hapi.Server();
var models = require('./models');

server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/test',
  handler: function (request, reply) {
    console.log(models.test);
    models.test.findAll({
      attributes: ['tid', 'name']
    }).then(function (test) {
      console.log(test);
      reply(test);
    });
  }
});

models.sequelize.sync().then(function() {
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
});
