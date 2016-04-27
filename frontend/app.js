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
        $scope.rawSettings = resp.data;
        $scope.settings = {}; // reset settings

        // for all settings
        for (var index in resp.data) {
            var item = resp.data[index];

            // make giant object out of settings
            $scope.settings[item.key] = item.value;
        }

    }, function errorCallback(resp) {
        console.error(resp);
    });

    // WEATHER
    // request token id
    // APPID=a0ae0f837a6983d091ff11e189824f6a
    // example
    //http://api.openweathermap.org/data/2.5/weather?id=5599665&APPID=a0ae0f837a6983d091ff11e189824f6a

    var weatherUrl = "http://api.openweathermap.org/data/2.5/";
    var appId = "&APPID=a0ae0f837a6983d091ff11e189824f6a";
    var locationId = "5599665";

    var weatherUpdateInterval = 1800000; //30 minutes

    var updateWeather = function () {

        $http(
            {
                method: 'GET',
                url: weatherUrl + "weather" + "?id=" + locationId + appId,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(function successCallback(resp) {
            console.log(resp.data);
            $scope.weather = resp.data;
        }, function errorCallback(resp) {
            console.error(resp);
        });

        $timeout(updateWeather, tickInterval); // reset the timer
    };
    updateWeather(); // on first run

    // Start the timer
    $timeout(updateWeather, weatherUpdateInterval);

});
