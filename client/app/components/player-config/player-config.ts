import * as angular from "angular";
import * as services from "../../services";
import * as template from "./player-config.pug";
import Tribe from "../../../../common/Tribe";
import Badge from "../../../../common/Badge";
import * as merge from "ramda/src/merge";
import Player from "../../../../common/Player";
import IRouteService = angular.route.IRouteService;

export class PlayerConfigController {
    static $inject = ['$scope', 'Coupling', '$location', '$route'];

    player: Player;
    tribe: Tribe;
    saving: boolean;

    constructor(public $scope,
                public Coupling: services.Coupling,
                public $location: angular.ILocationService,
                public $route: IRouteService) {
        $scope.$on('$locationChangeStart', this.askUserToSave($scope, Coupling));
        $scope.Badge = Badge;
        this.saving = false;
    }

    $onInit() {
        this.player = merge({badge: Badge.Default}, this.player);
    }

    savePlayer() {
        this.saving = true;
        this.Coupling.savePlayer(this.player)
            .then(() => this.$route.reload());
    }

    async removePlayer() {
        if (confirm("Are you sure you want to delete this player?")) {
            await this.Coupling.removePlayer(this.player);
            this.navigateToCurrentPairAssignments();
            this.$scope.$apply();
        }
    }

    private askUserToSave($scope, Coupling) {
        let promptIsAlreadyUp = false;

        return () => {
            if ($scope.playerForm.$dirty && !promptIsAlreadyUp) {
                promptIsAlreadyUp = true;
                const answer = confirm("You have unsaved data. Would you like to save before you leave?");
                if (answer) {
                    Coupling.savePlayer(this.player);
                }
            }
        };
    }

    private navigateToCurrentPairAssignments() {
        this.$location.path(`/${this.tribe.id}/pairAssignments/current`);
    }
}


export default angular.module("coupling.playerConfig", [])
    .controller('PlayerConfigController', PlayerConfigController)
    .directive('playerConfig', () => {
        return {
            controller: 'PlayerConfigController',
            controllerAs: 'playerConfig',
            bindToController: true,
            scope: {
                player: '=',
                players: '=',
                tribe: '='
            },
            restrict: 'E',
            template: template
        }
    });