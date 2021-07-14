var portal = require('/lib/xp/portal');
var thymeleaf = require( '/lib/thymeleaf' );
var contentLib = require( '/lib/xp/content' );
var portalLib = require('/lib/xp/portal');

exports.get = function(req) {

  var postData = portalLib.getContent().data;

  var postImage = portalLib.imageUrl( {
    id: postData.postImage,
    scale: 'block(600,300)'
  } )
  
  function processBody( body ){
    return portalLib.processHtml( {
      value: body
    })
  } 

  var model = {
    postData,
    author: postData.author,
    postTitle: postData.postTitle,
    postDate: postData.postDate,
    postIntro: postData.postIntro,
    postBody: processBody(postData.postBody),
    postImage,
  };


  var view = resolve('blog-post.html');

  return {
    body: thymeleaf.render(view, model)
  }
};