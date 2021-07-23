var portal = require('/lib/xp/portal');
var thymeleaf = require( '/lib/thymeleaf' );
var portalLib = require( '/lib/xp/portal' );


exports.get = function(req) {

  function getPath(goTo){
    return portalLib.pageUrl( {
      path: goTo,
    })
  }

  var homePath = getPath('/home')
  var searchPath = getPath('/home/search')

  var model = {
    homePath,
    searchPath
  };
  
  var view = resolve('header.html');

  return {
    body: thymeleaf.render(view, model)
  }
};