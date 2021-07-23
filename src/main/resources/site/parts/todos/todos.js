var thymeleaf = require( '/lib/thymeleaf' );
var httpClient = require( '/lib/http-client' );
var contentLib = require( '/lib/xp/content' );
var portalLib = require( '/lib/xp/portal' );
const contextLib = require('/lib/xp/context');


exports.get = function ( req ){

  const user = req.params
  var usersData = []
  var queryUsers = []
  
    queryUsers = contentLib.query( {
        start: 0,
        count: 999,
        contentTypes: ["games:user"]
      } ).hits


    queryUsers.forEach( user => {
      var userData = {}
      userData._id = user._id
      userData.id = user.data.id
      userData.name = user.data.name
      userData.email = user.data.email
      userData.username = user.data.username
      usersData.push(userData)
    })

      // createUsers()
      // modifyUser()
      // publishUsers()
      // deleteUsers()   

    if ( user.name )
    try{
      contextLib.run( {
        branch: 'draft',
        user: {
          login: 'importuser',
          userStore: 'system'
        },
        principals: ["role:system.admin"]
      }, function (){
        result = contentLib.create( {
          name: user.username,
          parentPath: '/teste/users',
          displayName: user.username,
          contentType: 'games:user',
          language: 'en',
          data: {
            id: 40,
            name: user.name,
            email: user.email,
            username: user.username
          }
        } );
      } )
    }catch(err){

    }

    var path = portalLib.pageUrl( {
      path: '/teste/users',
    } )

    var editPath =  portalLib.pageUrl( {
      path: '/teste/users/user',
    } )

    var deleteUser = portalLib.serviceUrl({
      service: 'delete-user',
    });

    var response = httpClient.request({
      url: 'http://localhost:8080' + deleteUser, 
      method: 'GET',
  });
    

  function createUsers(){
    var response = httpClient.request({
          url: 'https://jsonplaceholder.typicode.com/users/',
          method: 'GET',
        } ).body
        
        var users = JSON.parse(response)

        users.forEach( user => {
          contentLib.create( {
            name: user.username,
            parentPath: '/teste/users',
            displayName: user.username,
            contentType: 'games:user',
            language: 'en',
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username
            }
          });
        } )
  }

  function modifyUser(){
     contentLib.modify({
        key: '7dbab876-6f6a-4597-9955-42b960379fb3',
        editor: (c) => {
          c.data.name = 'Júlia Garcia'
          c.displayName = 'Júlia.Garcia'
        return c;
        }
      });
  }

  function publishUsers(){
    queryUsers.forEach( user => {
      contentLib.publish({
        keys: [user._id],
        sourceBranch: 'draft',
        targetBranch: 'master',
        includeDependencies: true
      });
    } )
  }

  function deleteUsers(){
    queryUsers.forEach( user => {
     contentLib.unpublish({
        keys: [user._id]
      });
    } )
    
    queryUsers.forEach( user => {
     contentLib.delete({
        key: user._id
    });
    } )
  }

  var model = {
    deleteUser,
    req,
    path,
    user,
    usersData,
    editPath,
    response
  };

  var view = resolve( 'todos.html' );
    
    return {
      body: thymeleaf.render( view, model )
    }
};