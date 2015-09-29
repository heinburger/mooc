/*global angular */
angular.module('mooc')
	.factory('wikipedia', function ($http, $q) {
		'use strict';

		var wikipedia = {};	
		var pageid='';

		wikipedia.grabUrl = function (id) {
			//maybe later - using the easy one for now....
		};

		wikipedia.grabImage = function (text) {
			var imagePromise = $q.defer();

			$.ajax({
			    url: 'http://en.wikipedia.org/w/api.php?action=query&titles='+text+'&prop=pageimages&format=json&pithumbsize=150',
			    jsonpCallback: 'jsonCallback',
			    contentType: "application/json",
			    dataType: 'jsonp',
			    success: function(results) {
					_(results.query.pages).each(function (page){
						if (!page.thumbnail) { imagePromise.resolve(); }
						else { 
							var url = page.thumbnail.source;
							imagePromise.resolve(url);
						}
					});
			    },
			    error: function(e) {
			       console.log(e);
			    }
			});

			return imagePromise.promise;

		};

		wikipedia.textSearch = function (text, options){
			var wikipediaPromise = $q.defer();

			var formattedResults = [];
			console.log('wikipedia service');

			$.ajax({
			    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles='+text,
			    jsonpCallback: 'jsonCallback',
			    contentType: "application/json",
			    dataType: 'jsonp',
			    success: function(results) {
			    	var pageid='';
					_(results.query.pages).each(function (page){
						if (!page.pageid) { wikipediaPromise.resolve(); }
						else {
							var formattedResult = {};
							formattedResult.from='wikipedia';
							formattedResult.title=page.title;
							formattedResult.rank=1;
							formattedResult.id=page.pageid;
							if (pageid===''){ pageid = page.pageid; }
							formattedResult.desc=page.extract;
							formattedResult.link = 'http://en.wikipedia.org/?curid='+page.pageid;

							formattedResults.push(formattedResult);
							wikipedia.grabImage(text).then(function (response){
								formattedResults[0].thumb = response;
								wikipediaPromise.resolve(formattedResults);
							});
						}

						//
					});
					
			    },
			    error: function(e) {
			       console.log(e);
			    }
			});

			return wikipediaPromise.promise;	
		};

		

		//end service
		return wikipedia;
	});

