var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.grid', 'cgBusy', 'ui.grid.edit', 'ui.grid.selection']);
myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/project-files', {
            templateUrl: 'template/project-files.html',
            controller: 'projectFilesControler',
            activetab: 'project-files'
        })

    .when('/app-perimission', {
        templateUrl: 'template/app-permission.html',
        controller: 'appPermissionControler',
        activetab: 'app-perimission'
    })

    .otherwise({
        redirectTo: '/project-files'
    })

});

myApp.controller('mainController', function ($scope, $route) {
    $scope.$route = $route;
});