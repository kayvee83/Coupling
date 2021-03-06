import {Coupling} from "../services";

export const tribeResolution = ['$route', 'Coupling', function ($route, Coupling: Coupling) {
    return Coupling.getTribe($route.current.params.tribeId);
}];

export const playersResolution = ['$route', 'Coupling', function ($route, Coupling: Coupling) {
    return Coupling.getPlayers($route.current.params.tribeId);
}];

export const historyResolution = ['$route', 'Coupling', function ($route, Coupling: Coupling) {
    return Coupling.getHistory($route.current.params.tribeId);
}];

export const pinsResolution = ['$route', 'Coupling', function ($route, Coupling: Coupling) {
    return Coupling.getPins($route.current.params.tribeId);
}];

export const retiredPlayersResolution = ['$route', 'Coupling', function ($route, Coupling: Coupling) {
    return Coupling.getRetiredPlayers($route.current.params.tribeId);
}];

export const tribesResolution = ['Coupling', function (Coupling: Coupling) {
    return Coupling.getTribes();
}];