var portal = require('/lib/xp/portal');
var thymeleaf = require( '/lib/thymeleaf' );
var portalLib = require('/lib/xp/portal');

exports.get = function(req) {

  function getPath(){
    return portalLib.pageUrl( {
      path: '/hello-world/blog',
    })
  }

  var homePath = getPath()

  var model = {
    homePath
  };

  var view = resolve('header.html');

  return {
    body: thymeleaf.render(view, model)
  }
};