angular.module("app",["ngRoute"]).
    controller('appCtrl', ['$scope','$route','userProvider','$routeProvider',
        function($scope, $route, userProvider, $routeProvider ){
            $scope.userIn = userProvider.isLoggedIn()
            if(!$scope.userIn)
            {

            }
            $routeProvider.otherwise({
                templateUrl: 'components/login/login.html'
            });
    }]);