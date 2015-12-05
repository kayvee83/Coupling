/// <reference path="../../../../typescript-libraries/typings/tsd.d.ts" />
/// <reference path="../../services.ts" />

class PlayerConfigController {
    static $inject = ['$scope', 'Coupling', '$location', '$route'];

    constructor($scope, Coupling:Coupling, $location:angular.ILocationService, $route: ng.route.IRouteService) {
        $scope.original = $scope.player;
        $scope.player = angular.copy($scope.player);

        $scope.savePlayer = () => {
            Coupling.savePlayer($scope.player);
            $route.reload();
        };

        $scope.removePlayer = () => {
            if (confirm("Are you sure you want to delete this player?")) {
                Coupling.removePlayer($scope.player)
                    .then(() => {
                        $location.path("/" + $scope.tribe._id + "/pairAssignments/current");
                    });
            }
        };

        $scope.$on('$locationChangeStart', () => {
            if ($scope.playerForm.$dirty) {
                var answer = confirm("You have unsaved data. Would you like to save before you leave?");
                if (answer) {
                    Coupling.savePlayer($scope.player);
                }
            }
        });
    }
}

angular.module("coupling.controllers")
    .controller('PlayerConfigController', PlayerConfigController);

angular.module("coupling.directives")
    .directive('playerConfig', () => {
        return {
            controller: 'PlayerConfigController',
            bindToController: true,
            restrict: 'E',
            templateUrl: '/app/components/player-config/player-config.html'
        }
    });