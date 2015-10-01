/*global angular */
angular.module('mooc')
	.factory('twitter', function ($http, $q) {
		'use strict';

		var twitter = {};

		twitter.initialize = function() {
			var initPromise = $q.defer();
			$('#twitter').removeClass('unloaded');
			initPromise.resolve('twitter');
			return initPromise.promise;
		};	

		twitter.textSearch = function(text, options) {
			var twitterPromise = $q.defer();
			var promises = [];
			var allResults = [];

			
			
			$q.all(promises).then(function(){
				twitterPromise.resolve(allResults);
			});			

			return twitterPromise.promise;
		};

		//end service
		return twitter;
	});

