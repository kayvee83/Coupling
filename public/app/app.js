"use strict";
var app = angular.module('coupling', ["ngRoute", 'ui.gravatar', 'coupling.controllers']);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
app.config(['$routeProvider', function (routeProvider) {
    routeProvider.when('/pairAssignments/current/', {templateUrl: '/partials/pairAssignments/', controller: "CurrentPairAssignmentsController"});
    routeProvider.when('/pairAssignments/new/', {templateUrl: '/partials/pairAssignments/', controller: "NewPairAssignmentsController"});
}]);
console.info(angular.module('ui.gravatar'));
angular.module('ui.gravatar').config([
    'gravatarServiceProvider', function (gravatarServiceProvider) {
        gravatarServiceProvider.defaults = {
            size: 100,
            "default": 'mm'  // Mystery man as default for missing avatars
        };

        gravatarServiceProvider.secure = true;
    }
]);