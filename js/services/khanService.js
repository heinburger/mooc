/*global angular */
angular.module('mooc')
	.factory('khan', function ($http, $q) {
		'use strict';

		var khan = {};	

		$http.get('http://www.khanacademy.org/api/v1/topictree').then(function (response){
			khan.tree = response.data;
		});

		khan.grabYoutubeInfo = function(id) {
			return $http.get('http://www.khanacademy.org/api/v1/videos/'+id).then(function (response){
				return {url:response.data.url, duration:response.data.duration };
			});

		};

		khan.textSearch = function(text, options) {
			var khanPromise = $q.defer();
			var promises = [];

			console.log('khan service');

			var allResults = [];
			var videoResults = [];
			

			var filterChildren = function (child) {
				var nodeText = '';
				//assemble the string to search over:
				if (child.title)     { nodeText += child.title.toLowerCase(); }  
				if (child.node_slug) { nodeText += child.node_slug.toLowerCase(); }  
				if (child.keywords)  { nodeText += child.keywords.toLowerCase(); }

				if (nodeText.indexOf(text) != -1) { 
					var formattedResult = {
						//khan specific stuff
						from:'khan',
						title:child.title,
						desc:child.description,
						type:child.kind,
						duration:false,
						youtube:child.youtube_id,
						rank:Math.random()*100 + 1
					};
					if (child.thumbnail_urls) { formattedResult.thumb = child.thumbnail_urls.filtered; }

					allResults.push(formattedResult);

					if (child.kind==='Video') { 
						if (formattedResult.youtube) { 
							var youtubePromise = $q.defer();
							promises.push(youtubePromise.promise);
		    				khan.grabYoutubeInfo(formattedResult.youtube).then(function (info){ 
		    					formattedResult.youtubeUrl = info.url;
		    					formattedResult.duration = info.duration;
		    					videoResults.push(formattedResult); 
		    					youtubePromise.resolve()
		    				}); 
		    			}
					}
				}

				if (child.children) { 
					_(child.children).each(function (next){
						filterChildren(next);
					});
				}
			};

			_(khan.tree.children).each(function (top){
				filterChildren(top);							
			});

			if (!promises.length) { khanPromise.resolve(); }

			$q.all(promises).then(function(){
				if (options.video) { khanPromise.resolve(videoResults); }
				else { khanPromise.resolve(allResults); }
			});

			return khanPromise.promise;
		};

		//end service
		return khan;
	});

