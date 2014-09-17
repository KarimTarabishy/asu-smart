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