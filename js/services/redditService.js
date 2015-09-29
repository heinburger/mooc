/*global angular */
angular.module('mooc')
	.factory('reddit', function ($http, $q) {
		'use strict';

		var reddit = {};	

		reddit.textSearch = function (text, options){
			var redditPromise = $q.defer();
			var formattedResults = [];
			console.log('reddit service');
			/*
			setTimeout(function(){
				redditPromise.resolve({type:'Video',from:'reddit',desc:'from reddit',title:'the reddit one'});
			},10000);
			*/

			//subreddits!!!
			$http.get('https://www.reddit.com/api/subreddits_by_topic.json?query='+text).then(function (response){
				var results = response.data;
				if(!results.length) { redditPromise.resolve(); }
				_(results).each(function (result){
					var subReddit = {};
					subReddit.title="/r/"+result.name;
					subReddit.link='http://www.reddit.com/r/'+result.name;
					subReddit.desc="a subreddit related to "+text;

					formattedResults.push(subReddit);
				});
				redditPromise.resolve(formattedResults);
			});


			return redditPromise.promise;	

		}

		

		//end service
		return reddit;
	});

