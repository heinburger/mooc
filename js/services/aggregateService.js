/*global angular */
angular.module('mooc')
	.factory('agg', function ($http, $q, khan, reddit) {
		'use strict';

		var agg = {};

		agg.services = [];

		agg.filterDuration = 99999;
		agg.khan = khan;
		agg.reddit = reddit;
		
		
		agg.textSearch = function (rawText,options) {
			var aggPromise = $q.defer();
			var allResults=[];
			var promises = [];
			var text = rawText.toLowerCase();


			_(agg.services).each(function (service){
				var servicePromise = $q.defer();
				agg[service].textSearch(text,options).then(function (serviceResults){
					allResults = allResults.concat(serviceResults);
					servicePromise.resolve();
				});
				promises.push(servicePromise.promise);
			});

			
			$q.all(promises).then(function (){
				aggPromise.resolve(allResults);
			});

			return aggPromise.promise;
			
		};

		//end service
		return agg;
	});

