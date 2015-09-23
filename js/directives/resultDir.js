/*global angular */
angular.module('mooc')
	.directive('resultLoop', function ($http) {
		'use strict';

		return {
			restrict: 'E',
		    scope: {
		    	result:'='
		    },
		    templateUrl: 'js/directives/templates/result.html',
		    link: function(scope, element, attrs) {
		    	
		    }
		};
	});