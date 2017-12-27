angular.module('webrtcapi', [])
    .controller('Hello', function($scope, $http) {
        $http.get('http://localhost:8090/user/getAll').
        then(function(response) {
            $scope.response = response.data;
        });
    });