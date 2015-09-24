/*global angular */
angular.module('mooc')
	.directive('resultLoop', function ($http, khan) {
		'use strict';

		return {
			restrict: 'E',
		    scope: {
		    	result:'='
		    },
		    templateUrl: 'js/directives/templates/result.html',
		    link: function(scope, element, attrs) {
		    	if (scope.result.youtube) { 
		    		khan.grabYoutubeUrl(scope.result.youtube).then(function (url){ scope.youtube = url; }); 
		    	}
		    }
		};
	});