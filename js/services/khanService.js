/*global angular */
angular.module('mooc')
	.factory('khan', function ($http, $q) {
		'use strict';

		var khan = {};	

		$http.get('http://www.khanacademy.org/api/v1/topictree').then(function (response){
			khan.tree = response.data;
		});

		khan.search = function(rawText) {
			var results = [];
			var text = rawText.toLowerCase();
			console.log('khan search text: '+text)

			var filterChildren = function (child) {
				var result = {};
				var nodeText = '';
				
				if (child.title) { nodeText += child.title.toLowerCase(); }  
				if (child.node_slug) { nodeText += child.node_slug.toLowerCase(); }  
				if (nodeText.indexOf(text) != -1) { results.push(result); console.log(nodeText)};
				if (child.children) { 
					_(child.children).each(function (next){
						filterChildren(next);
					});
				}
			};

			_(khan.tree.children).each(function (top){
				filterChildren(top);							
			});


			//BROKEN - this is not waiting for all the results.... promises or something
			return results;
		};







		//end service
		return khan;
	});

