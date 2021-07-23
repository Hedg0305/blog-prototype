exports.get = function(req) {

  var params = req

  return {
    body: {
      params
    },
    contentType: 'application/json'
  };

};