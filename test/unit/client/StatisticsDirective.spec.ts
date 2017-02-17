import "ng-fittext";
import "../../../client/app/app";
import Tribe from "../../../common/Tribe";
import Player from "../../../common/Player";
import PairAssignmentSet from "../../../common/PairAssignmentSet";
import *  as _ from "underscore";

describe('Statistics directive', function () {

    beforeEach(angular.mock.module('coupling'));

    function buildDirective($rootScope, $compile: angular.ICompileService, tribe: Tribe, players: Player[], history: PairAssignmentSet[]) {
        const element = angular.element('<statistics tribe="tribe" players="players" history="history"/>');
        const scope = $rootScope.$new();
        scope.tribe = tribe;
        scope.players = players;
        scope.history = history;
        const statisticsDirective = $compile(element)(scope);

        scope.$digest();
        return statisticsDirective;
    }

    it('will show a tribe card', inject(function ($compile, $rootScope) {
        const tribe: Tribe = {id: '1', name: 'Super'};
        const statisticsDirective = buildDirective($rootScope, $compile, tribe, [], []);

        const tribeNameElement = statisticsDirective.find('tribecard .tribe-name');

        expect(tribeNameElement.text()).toBe(tribe.name);
    }));

    it('will show the rotation number', inject(function ($compile, $rootScope) {
        const tribe: Tribe = {id: '2', name: 'Mathematica'};
        const players: Player[] = [
            {_id: 'harry', tribe: '2'},
            {_id: 'larry', tribe: '2'},
            {_id: 'curly', tribe: '2'},
            {_id: 'moe', tribe: '2'}
        ];

        const statisticsDirective = buildDirective($rootScope, $compile, tribe, players, []);
        const rotationNumberElement = statisticsDirective.find('.rotation-number');
        expect(rotationNumberElement.text()).toBe('3');
    }));

    it('will show pairings ordered by longest time since last paired', inject(function ($compile, $rootScope) {
        const tribe: Tribe = {id: '2', name: 'Mathematica'};
        const players: Player[] = [
            {_id: 'harry', name: 'Harry', tribe: '2'},
            {_id: 'larry', name: 'Larry', tribe: '2'},
            {_id: 'curly', name: 'Curly', tribe: '2'},
            {_id: 'moe', name: 'Moe', tribe: '2'}
        ];

        const history: PairAssignmentSet[] = [
            {pairs: [[players[0], players[1]], [players[2], players[3]]], date: '', tribe: tribe.id}
        ];

        const statisticsDirective = buildDirective($rootScope, $compile, tribe, players, history);
        const pairElements = statisticsDirective.find('[ng-repeat="report in self.statistics.pairReports"]');

        const actualPairedPlayerNames = _.chain(pairElements)
            .map((element, index) => {
                let children = pairElements.eq(index)
                    .find('[ng-repeat="player in report.pair"] text[ng-model="playerCard.player.name"]');
                return [children.eq(0).text(), children.eq(1).text()];
            })
            .value();

        expect(actualPairedPlayerNames).toEqual([
            ['Harry', 'Curly'],
            ['Harry', 'Moe'],
            ['Larry', 'Curly'],
            ['Larry', 'Moe'],
            ['Harry', 'Larry'],
            ['Curly', 'Moe'],
        ]);
    }));

});