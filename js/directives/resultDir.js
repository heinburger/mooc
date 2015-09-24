/*global angular */
angular.module('mooc')
	.directive('resultLoop', function ($http, agg, khan) {
		'use strict';

		return {
			restrict: 'E',
		    scope: {
		    	result:'='
		    },
		    templateUrl: 'js/directives/templates/result.html',
		    link: function(scope, element, attrs) {
		    	if (scope.result.youtube) { 
		    		khan.grabYoutubeInfo(scope.result.youtube).then(function (info){ 
		    			scope.youtube = info.url;
		    			scope.result.duration = info.duration;
		    		}); 
		    	}
		    }
		};
	});