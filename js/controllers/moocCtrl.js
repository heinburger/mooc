/*global angular */
angular.module('mooc')
	.controller('moocCtrl', function moocCtrl($scope, $routeParams, $filter, khan) {
		'use strict';

		//setup default
		var defaultResult = [{ title:'Start seaching for some shit...', desc:'keep it simple' }];
		var noResult = [{title:'Nothing matches', desc:'try another search or ADD TO THE ENGINE'}];
		
		$scope.results = defaultResult;

		$('#slider').slider({
			formatter: function(value) {
				return 'Current value: ' + value;
			}
		});

		$scope.doSearch = function (text) {
			//if (text!=='' && text!==undefined) {
			var tempResults = [];
			tempResults = khan.search(text);
			angular.copy(tempResults, $scope.results);

		};
		
	});