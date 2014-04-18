"use strict";
var services = angular.module("coupling.services", []);

services.service("Coupling", function ($http) {
    var Coupling = this;

    this.spin = function (players, callback) {
        var getPromise = $http.post('/api/game', players);
        getPromise.success(function (pairAssignmentDocument) {
            Coupling.currentPairAssignments = pairAssignmentDocument;
            callback();
        }).error(console.log);
    };

    this.saveCurrentPairAssignments = function (callback) {
        var postPromise = $http.post('/api/savePairs', Coupling.currentPairAssignments);
        postPromise.success(function (updatedPairAssignmentDocument) {
            Coupling.currentPairAssignments = updatedPairAssignmentDocument;
            callback();
        }).error(console.log);
    };

    this.getPlayers = function (callback) {
        $http.get('/api/players').success(callback).error(console.log);
    };

    this.getHistory = function (callback) {
        $http.get('/api/history').success(callback).error(console.log);
    };
});