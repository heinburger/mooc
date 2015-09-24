/*global angular */
angular.module('mooc')
	.factory('agg', function ($http, $q) {
		'use strict';

		var promise; 
		var agg = {};

		agg.filterDuration = 99999;
		

		//end service
		return agg;
	});

