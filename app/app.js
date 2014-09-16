angular.module("app",["ngRoute"]).
    controller('appCtrl', ['$scope','$route','userProvider', function($scope, $route, userProvider ){
        $scope.userIn = userProvider.isLoggedIn()
    }]);