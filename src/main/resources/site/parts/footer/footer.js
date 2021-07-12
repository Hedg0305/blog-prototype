var thymeleaf = require( '/lib/thymeleaf' );

exports.get = function(req) {

  var view = resolve('footer.html');

  return {
    body: thymeleaf.render(view)
  }
};