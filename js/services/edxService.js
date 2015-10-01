/*global angular */
angular.module('mooc')
	.factory('edx', function ($http, $q) {
		'use strict';

		var edx = {};

		edx.initialize = function() {
			$http.get('http://www.mobile3.m.sandbox.edx.org/api/course_structure/v0/courses/').then(function (response){
				edx.tree = response;
				console.log('edx ready...');
				console.log(edx.tree);
				//$('#edx').removeClass('unsloaded');
			});
		};	

		edx.textSearch = function(text, options) {
			var edxPromise = $q.defer();
			var promises = [];
			var allResults = [];

			/*
			console.log('edx service');
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
			*/
			
			$q.all(promises).then(function(){
				edxPromise.resolve(allResults);
			});			

			return edxPromise.promise;
		};

		//end service
		return edx;
	});

