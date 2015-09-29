/*global angular */
angular.module('mooc')
	.factory('wikipedia', function ($http, $q) {
		'use strict';

		var wikipedia = {};	

		wikipedia.textSearch = function (text, options){
			var wikipediaPromise = $q.defer();
			var formattedResults = [];
			console.log('wikipedia service');

			$http.get('http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles='+text).then(function (response){
				var results = response.data;
				var formattedResults = [];

				if(!results.length) { wikipediaPromise.resolve(); }
				_(results.query.pages).each(function (page){
					var formattedResult = {};
					formattedResult.from='wikipedia';
					formattedResult.title=page.title;
					formattedResult.id=page.pageid;
					formattedResult.desc=page.extract;

					formattedResults.push(formattedResult);
				});
				wikipediaPromise.resolve(formattedResults);
			});


			return wikipediaPromise.promise;	

		}

		

		//end service
		return wikipedia;
	});

