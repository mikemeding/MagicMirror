/**
 * Created by mike on 3/5/16.
 */

var app = angular.module('myApp', []);

app.controller("Main", function ($scope, $http) {
    $scope.test = "Magic Mirror";

    $scope.baseUrl = "http://localhost:8000/magic_mirror/settings/";

    // Get all settings from database
    $http(
        {
            method: 'GET',
            url: $scope.baseUrl,
            headers: {
                "Content-Type":"application/json"
            }
        }
    ).then(function successCallback(resp) {
        console.log(resp.data);
        $scope.settings = resp.data;
    }, function errorCallback(resp) {
        console.error(resp);
    })

});
