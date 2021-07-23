var thymeleaf = require( '/lib/thymeleaf' );
var httpClient = require( '/lib/http-client' );
var contentLib = require( '/lib/xp/content' );
var portalLib = require( '/lib/xp/portal' );
const contextLib = require('/lib/xp/context');


exports.get = function ( req ){

  var id = req.params.id || 'c7f3585f-73e1-44b5-a2b5-7d17142ebdd3'
  var user = {}

  var query = `_id = '${id}'`
  var queryUsers = contentLib.query( {
      start: 0,
      query: query,
      contentTypes: ["games:user"]
    } ).hits
  
  user.name = queryUsers[0].data.name
  user.email = queryUsers[0].data.email
  user.username = queryUsers[0].data.username
  
  var path = portalLib.pageUrl( {
    path: '/teste/users',
  } )

  var model = {
    path,
    id,
    query,
    queryUsers,
    user
  };
  
  
  var view = resolve( 'user.html' );
  
  return {
    body: thymeleaf.render( view, model )
  }
};