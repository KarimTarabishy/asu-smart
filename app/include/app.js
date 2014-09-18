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
    controller('loginCtrl', ['$scope','userProvider',function($scope, userProvider) {
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

    }]);
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
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("components/login/login.html","<div ng-controller=\"loginCtrl\">\r\n    <div ng-show=\"notValid.show\" >Invalid email or password</div>\r\n    <form  name=\"myForm\" novalidate ng-submit=\"submit(data)\">\r\n        <input type=\"email\" name=\"email\" ng-model=\"data.email\"  placeholder=\"Email\" required/><br>\r\n        <input type=\"password\" name=\"password\" ng-model=\"data.password\" placeholder=\"Password\" required></br>\r\n        <button  type=\"submit\" ng-disabled=\"myForm.$invalid\">login</button>\r\n    </form>\r\n</div>");}]);