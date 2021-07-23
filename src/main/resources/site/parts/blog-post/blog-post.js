var thymeleaf = require('/lib/thymeleaf')
var portalLib = require('/lib/xp/portal')
var contentLib = require('/lib/xp/content')

exports.get = function (req) {
  var postData = portalLib.getContent()

  var postImage = portalLib.imageUrl({
    id: postData.data.postImage,
    scale: 'block(600,300)',
  })

  var query = `range('publish.from', '', instant('${postData.publish.from}'))`

  var queryPreiviousPosts = contentLib.query({
    start: 0,
    query: query,
    contentTypes: ['games:blog'],
  }).hits

  var query = `range('publish.from', instant('${postData.publish.from}'), '')`
  var queryNextPosts = contentLib.query({
    start: 0,
    query: query,
    contentTypes: ['games:blog'],
  }).hits

  var nextPostPath
  var previousPostPath

  queryNextPosts.length
    ? (nextPostPath = getPath(queryNextPosts[0]._path))
    : (nextPostPath = null)

  queryPreiviousPosts.length
    ? (previousPostPath = getPath(
        queryPreiviousPosts[queryPreiviousPosts.length - 1]._path
      ))
    : (previousPostPath = null)

  function getPath(goTo) {
    return portalLib.pageUrl({
      path: goTo,
    })
  }

  function processBody(body) {
    return portalLib.processHtml({
      value: body,
    })
  }

  var model = {
    nextPostPath,
    previousPostPath,
    postData: query,
    author: postData.data.author,
    postTitle: postData.data.postTitle,
    postDate: postData.data.postDate,
    postIntro: postData.data.postIntro,
    postBody: processBody(postData.data.postBody),
    postImage,
  }

  var view = resolve('blog-post.html')

  return {
    body: thymeleaf.render(view, model),
  }
}
