angular.module("app",["ngRoute"]).
    config(['$routeProvider',function($routeProvider){
        $routeProvider.otherwise({
            templateUrl: 'components/login/login.html'
        });
    }]).
    controller('appCtrl', ['$scope','userProvider',
        function($scope, userProvider ){
            $scope.userIn = userProvider.isLoggedIn()
            if(!$scope.userIn)
            {

            }

    }]);
angular.module('app').
    controller('loginCtrl', function($scope, userProvider) {
        var usersStore =[//this is not defined with $scope so it wont appear to the view this is a hidden property
            {
                email: 'aya@gmail.com',
                password: '123'
            },
            {
                email: 'ayah@gmail.com',
                password: '1234'
            }
        ];

        var doLogIn =

        $scope.info = {valid: true};
        $scope.submit = function(data) {
            // now data already is not null so we can safely use it
            var searchedUser = null;
            //search for the user object in our users store
            for(var i = 0; i < usersStore.length; i++){
                var user = usersStore[i];
                if(user.email === data.email) {
                    searchedUser = user;
                    break;
                }

            }
            if(searchedUser === null || searchedUser.password != data.password)
            {
                $scope.info.valid = false;
            }
            else
            {
                userProvider.logUser(searchedUser);
                //here you can go to the other view
            }
        };

    });
angular.module('app')
    .factory('loginProvider', function(userProvider) {
        var func = function(){

        };
        return func;
    });
angular.module('app')
    .factory('userProvider', function() {
        var obj = {};
        var loggedUser = null;
        obj.isLoggedIn = function () {
            return loggedUser !== null;
        };
        obj.logUser = function (data){
            loggedUser = data;
        };
        return obj;
    });
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("components/login/login.html","<!-- TODO: Put the ng-models on input elements and make form validation -->\r\n<div id=\"wrapper\">\r\n    <div id=\"logo\">\r\n        <span id=\"title\"><span>UNI</span>NECT</span>\r\n    </div>\r\n</div>\r\n<div id=\"login-content\" ng-controller=\"loginCtrl\">\r\n    <div id=\"login\">\r\n        <form name=\"loginForm\" ng-submit=\"submit(data)\" novalidate>\r\n            <label for=\"username\" class=\"text-label\">\r\n                Username\r\n            </label>\r\n            <input type=\"text\" class=\"input-text\" name=\"username\" id=\"username\">\r\n            <label for=\"password\" class=\"text-label\">\r\n                Password\r\n            </label>\r\n            <input type=\"password\" class=\"input-text\" name=\"password\" id=\"password\">\r\n            <input type=\"checkbox\" name=\"remember\" id=\"remember\" class=\"input-radio\">\r\n            <label for=\"remember\">Remember Me</label>\r\n            <button id=\"login-submit\"> LOG IN</button>\r\n        </form>\r\n\r\n\r\n    </div>\r\n    <p id=\"reset-pass\">Forgot your password? <a href=\"#\">Click here to reset it.</a> </p>\r\n</div>");}]);