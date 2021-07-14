var portal = require('/lib/xp/portal');
var thymeleaf = require( '/lib/thymeleaf' );
var portalLib = require( '/lib/xp/portal' );


exports.get = function(req) {

  function getPath(goTo){
    return portalLib.pageUrl( {
      path: goTo,
    })
  }

  var homePath = getPath('/hello-world/blog')
  var searchPath = getPath('/hello-world/blog/search')

  var model = {
    homePath,
    searchPath
  };
  
  var view = resolve('header.html');

  return {
    body: thymeleaf.render(view, model)
  }
};