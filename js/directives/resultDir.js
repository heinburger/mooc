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
		    	scope.time = function(duration) {
		    		var minutes = Math.floor(duration/60);
		    		var seconds = duration - minutes * 60;
		    		return minutes+"m";
		    	}
		    }
		};
	});