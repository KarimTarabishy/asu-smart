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