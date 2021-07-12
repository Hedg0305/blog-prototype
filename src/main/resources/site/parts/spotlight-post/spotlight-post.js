var portal = require('/lib/xp/portal');
var thymeleaf = require( '/lib/thymeleaf' );
var contentLib = require( '/lib/xp/content' );
var portalLib = require('/lib/xp/portal');

exports.get = function ( req )
{
  
  var postInfo = {}

  var component = portalLib.getComponent();

  var post = contentLib.get({
    key: component.config.spotlightPost
  });

  postInfo.title = post.data.postTitle
  postInfo.author = post.data.author
  postInfo.intro = post.data.postIntro
  postInfo.url = getPath(post._path)
  postInfo.image = getImgURL(post.data.postImage)

  function getImgURL( img ){
    return portalLib.imageUrl( {
      id: img,
      scale: 'block(900,600)'
    })
  }

  function getPath( path ){
    return portalLib.pageUrl( {
      path: path,
    })
  }

  var model = {
    component,
    postInfo
  };

  var view = resolve('spotlight-post.html');

  return {
    body: thymeleaf.render(view, model)
  }
};