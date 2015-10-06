/*global angular */
angular.module('mooc', ['ngRoute'])
  .config(function ($routeProvider, $httpProvider) {
    'use strict';

    var routeConfig = {
      controller: 'moocCtrl',
      templateUrl: 'index.html'
    };

    $routeProvider
      .when('/', routeConfig)
      .when('/:status', routeConfig)
      .otherwise({
        redirectTo: '/'
      });
  });

var debug = {};