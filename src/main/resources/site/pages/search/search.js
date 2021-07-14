var portal = require('/lib/xp/portal'); 
var thymeleaf = require( '/lib/thymeleaf' ); 

exports.get = function ( req ){

  var content = portal.getContent();
  
  var model = {
    displayName: portal.getContent().displayName,
    mainRegion: content.page.regions.main,
  }

  var view = resolve('xml.html');

  return {
    body: thymeleaf.render(view, model)
  }
};