"use strict";
var controllers = angular.module('coupling.controllers', ['coupling.services']);

controllers.controller('CouplingController', ['$scope', '$location', 'Coupling', function (scope, location, Coupling) {

    Coupling.getPlayers(function (players) {
        scope.players = players;
    });

    scope.spin = function () {
        location.path("/pairAssignments/new");
    };

}]);

controllers.controller('PairAssignmentsController', ['$scope', '$routeParams', 'Coupling', function (scope, params, Coupling) {
    var formatDate = function (date) {
        return date.getMonth() + 1 + '/' + date.getDate() + "/" + date.getFullYear();
    };

    function putPairAssignmentDocumentOnScope() {
        scope.formattedDate = formatDate(new Date(Coupling.currentPairAssignments.date));
        scope.pairAssignmentDocument = Coupling.currentPairAssignments;
    }

    if (params.pairAssignmentsId == "new") {
        Coupling.spin(putPairAssignmentDocumentOnScope);
    }

    scope.save = function () {
        Coupling.saveCurrentPairAssignments(putPairAssignmentDocumentOnScope);
    }
}]);