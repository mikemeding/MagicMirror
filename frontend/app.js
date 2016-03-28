/**
 * Created by mike on 3/5/16.
 */

var app = angular.module('myApp', []);

app.controller("Main", function ($scope, $http, $timeout) {

    $scope.baseUrl = "http://localhost:8000/magic_mirror/settings/";

    // CLOCK
    $scope.clock = "loading..."; // initialise the time variable
    var tickInterval = 1000; //ms

    var tick = function () {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, tickInterval); // reset the timer
    };

    // Start the timer
    $timeout(tick, tickInterval);


    // SETTINGS
    $http(
        {
            method: 'GET',
            url: $scope.baseUrl,
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(function successCallback(resp) {
        console.log(resp.data);
        $scope.settings = resp.data;

        // for all settings
        for (var index in $scope.settings) {
            var item = $scope.settings[index];

            // find welcomeText
            if (item.key === "welcomeText") {
                $scope.welcomeText = item.value; // bind it
            }
        }

    }, function errorCallback(resp) {
        console.error(resp);
    })

});
