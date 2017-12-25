angular.module('webrtcapi', [])
    .controller('Hello', function($scope, $http) {
        $http.get('http://localhost:8090/login').
        then(function(response) {
            $scope.greeting = response.data;
        });
    });