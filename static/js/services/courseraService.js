/*global angular */
angular.module('mooc')
	.factory('coursera', function ($http, $q) {
		'use strict';

		var coursera = {};	

		coursera.initialize = function() {
			var initPromise = $q.defer();
			$http.get('https://api.coursera.org/api/catalog.v1/courses?fields=shortDescription,photo,video,categories,sessions').then(function (response){
				coursera.tree = response.data.elements;
				console.log('coursera ready...');
				$('#coursera').removeClass('unloaded');
				initPromise.resolve('coursera');
			});
			return initPromise.promise;
		};
		
		coursera.textSearch = function(text, options) {
			var courseraPromise = $q.defer();
			var promises = [];
			var allResults = [];

			console.log('coursera service');
			_(coursera.tree).each(function (child){
				var nodeText = '';
				//assemble the string to search over:
				if (child.name)     { nodeText += child.name.toLowerCase(); }  
				if (child.shortDescription) { nodeText += child.shortDescription.toLowerCase(); }  

				if (nodeText.indexOf(text) != -1) { 
					var formattedResult = {};

					formattedResult.youtubeUrl = 'http://www.youtube.com/watch?v='+child.video;
					formattedResult.from = 'coursera';
					formattedResult.title = child.name;
					formattedResult.desc = child.shortDescription;
					formattedResult.type = child.video ? 'Video' : 'Course';
					formattedResult.rank = Math.random()*100 + 1;
					formattedResult.thumb = child.photo;

					allResults.push(formattedResult);
				}

			});
			
			$q.all(promises).then(function(){
				courseraPromise.resolve(allResults);
			});			

			return courseraPromise.promise;
		};

		//end service
		return coursera;
	});

