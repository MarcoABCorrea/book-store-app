'use strict';

angular
    .module('bookStoreApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.utils',
        'restangular',
        'dialogs.main',
        'ui.bootstrap',
        'services.config'
    ])
    .config(function($stateProvider, $urlRouterProvider, RestangularProvider, configuration) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('base', {
                abstract: true,
                views: {
                    "": {
                        templateUrl: "templates/base.html"
                    },
                    "topBar@base": {
                        templateUrl: "templates/topBar.html",
                        controller: 'BaseCtrl'
                    },
                    "sideBar@base": {
                        templateUrl: "templates/sideBar.html"
                    }
                },
                data: {
                    authenticated: true,
                    displayName: 'Home',
                    proxy: 'base.home'
                }
            })
            .state('base.home', {
                url: "/",
                templateUrl: "views/main.html",
                controller: 'MainCtrl'
            });
    });
