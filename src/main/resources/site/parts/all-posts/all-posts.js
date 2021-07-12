var portal = require('/lib/xp/portal');
var thymeleaf = require( '/lib/thymeleaf' );
var contentLib = require( '/lib/xp/content' );
var portalLib = require('/lib/xp/portal');

exports.get = function(req) {

  var postsInfo = [];

  var content = portal.getContent();

  var children = contentLib.getChildren( {
    key: content._path,
    start: 0,
  } ).hits;
  
  children.forEach( post =>{
    var postInfo = {}
    postInfo._name = post._name
    postInfo.author = post.data.author
    postInfo.title = post.data.postTitle
    postInfo.intro = post.data.postIntro
    postInfo.image = getImgURL( post.data.postImage )
    postInfo.path = getPath( post._path )
    postsInfo.push( postInfo );
  } )
  
  function getImgURL( img ){
    return portalLib.imageUrl( {
      id: img,
      scale: 'block(300,150)'
    })
  }

  function getPath( path ){
    return portalLib.pageUrl( {
      path: path,
    })
  }

  var model = {
    displayName: portal.getContent().displayName,
    mainRegion: content.page.regions.main,
    type: content.type,
    postsInfo,
    children
  }

  var view = resolve('all-posts.html');

  return {
    body: thymeleaf.render(view, model)
  }
};