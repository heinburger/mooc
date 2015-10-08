/*global angular */
angular.module('mooc')
	.factory('rethink', function ($http, $q) {
		'use strict';

		var rethink = {};

		rethink.get = function () {
			return $http.get('/lines');
		};

		rethink.create = function (line) {
			return $http.post('/lines',line);
		};

		rethink.update = function (line) {
			return $http.put('/lines/'+line.id,line);
		};

		rethink.delete = function (id) {
			return $http.delete('/lines/'+id);
		};
		
		

		//end service
		return rethink;
	});

