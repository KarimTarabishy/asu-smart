angular.module('app')
    .factory('userProvider', function() {
        var obj = {};
        var loggedUser = null;
        obj.isLoggedIn = function () {
            return loggedUser !== null;
        }
        obj.logUser = function (data){
            loggedUser = data;
        }
    })