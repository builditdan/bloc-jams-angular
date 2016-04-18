console.log("Position #1");
var Inert = require('inert');
var Hapi = require('hapi'),
    path = require('path'),
    
    port = process.env.PORT || 3000;
    console.log(Hapi);
    var server = new Hapi.Server();
    server.register(Inert, function () {});
                    
      server.connection({ port: port });
        var routes = {
          css: {
              method: 'GET',
              path: '/styles/{path*}',
              handler: createDirectoryRoute('styles')
          },
          js: {
              method: 'GET',
              path: '/scripts/{path*}',
              handler: createDirectoryRoute('scripts')
          },
          assets: {
              method: 'GET',
              path: '/assets/{path*}',
              handler: createDirectoryRoute('assets')
          },
          templates: {
              method: 'GET',
              path: '/templates/{path*}',
              handler: createDirectoryRoute('templates')
          },
          spa: {
              method: 'GET',
              path: '/{path*}',
              handler: {
                  file: path.join(__dirname, '/dist/index.html')
              }
          }
      };

  console.log("Position #3");
  server.route([ routes.css, routes.js, routes.assets, routes.templates, routes.spa ]);

  console.log("Position #4");
   
   
  console.log("Starting server");
  

//  server.start( onServerStarted );
  console.log("Position #2");
    

function onServerStarted() {
    console.log( 'Server running on port ', port );
}

function createDirectoryRoute( directory ) {
   console.log(directory);
    var route = {
        directory: {
              
            path: path.join(__dirname, '/dist/', directory)
        }
    };
  console.log(route);
  return route;
}

module.exports = server;