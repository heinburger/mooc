/*global angular */

angular.module('mooc')
	.controller('moocCtrl', function moocCtrl($scope, $routeParams, $filter) {
		'use strict';

		$('#slider').slider({
			formatter: function(value) {
				return 'Current value: ' + value;
			}
		});
		
	});