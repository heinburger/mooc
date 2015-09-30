/*global angular */
angular.module('mooc')
	.factory('reddit', function ($http, $q) {
		'use strict';

		var reddit = {};
		$('#reddit').removeClass('unloaded');	

		reddit.textSearch = function (text, options){
			var redditPromise = $q.defer();
			var promises = [];

			var formattedResults = [];
			console.log('reddit service');


			//subreddits!!!
			$http.get('https://www.reddit.com/api/subreddits_by_topic.json?query='+text).then(function (response){
				var results = response.data;
				if(!results.length) { redditPromise.resolve(); }
				_(results).each(function (result){
					var subRedditPromise = $q.defer();
					promises.push(subRedditPromise.promise);

					var subReddit = {};
					subReddit.type='subreddit';
					subReddit.from='reddit';
					subReddit.rank=Math.random()*100 + 1;
					subReddit.link='http://www.reddit.com/r/'+result.name;

					//grab description
					$http.get('https://www.reddit.com/r/'+result.name+'/about.json').then(function (response){
						subReddit.desc = response.data.data.public_description;
						subReddit.title = response.data.data.title;
						subReddit.thumb = response.data.data.header_img;
						formattedResults.push(subReddit);

						/*
						var superSubRedditPromise = $q.defer();
						promises.push(superSubRedditPromise.promise);
						//grab top match
						$http.get('https://www.reddit.com/r/'+result.name+'/search.json?sort=top&limit=5&q='+text).then(function (response){
							console.log(response.data)
							superSubRedditPromise.resolve();
						});
						*/

						subRedditPromise.resolve();
					});	
				});

				$q.all(promises).then(function(){
					redditPromise.resolve(formattedResults);
				});

			});

			

			return redditPromise.promise;	

		};

		

		//end service
		return reddit;
	});

