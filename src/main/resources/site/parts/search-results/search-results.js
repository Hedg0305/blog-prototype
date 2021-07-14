var portal = require('/lib/xp/portal');
var thymeleaf = require( '/lib/thymeleaf' );
var portalLib = require( '/lib/xp/portal' );
var contentLib = require('/lib/xp/content');
var httpClient = require('/lib/http-client');

exports.get = function(req) {

  var search = req.params.q || 'pubg'
  var postsInfo = []
  
  function getPath( goTo ){
    return portalLib.pageUrl( {
      path: goTo,
    })
  }
  
  var query = "ngram('*.postTitle', '" + search + "', 'AND')"
  
  var queryPosts = contentLib.query({
    start: 0,
    query: query,
  }).hits

  queryPosts.forEach( post =>{
    var postData = {}
    postData._name = post._name
    postData.author = post.data.author
    postData.title = post.data.postTitle
    postData.intro = post.data.postIntro
    postData.image = getImgURL( post.data.postImage )
    postData.path = getPath( post._path )
    postsInfo.push( postData );
  } )

  var homePath = getPath('/hello-world/blog')
  var searchPath = getPath( '/hello-world/search' )

  function getPath( goTo ){
    return portalLib.pageUrl( {
      path: goTo,
    })
  }

  function getImgURL( img ){
    return portalLib.imageUrl( {
      id: img,
      scale: 'block(300,150)'
    })
  }

  var model = {
    homePath,
    searchPath,
    queryPosts,
    postsInfo,
    search
  };

  var view = resolve('search-results.html');

  return {
    body: thymeleaf.render(view, model)
  }
};