/*global angular */
angular.module('mooc')
	.factory('youtube', function ($http, $q) {
		'use strict';

		var youtube = {};	

		youtube.textSearch = function (text, options){
			var youtubePromise = $q.defer();
			var formattedResults = [];
			console.log('youtube service');

			//crash course: UCX6b17PVsYBQ0ip5gyeme-Q
			//vsauce: UC6nSFpj9HTCZ5t-N3Rm3-HA
			//test playlist(anatomy and phys) - id: "PL8dPuuaLjXtOAKed_MxxWBNaPno5h3Zs8"


			console.log('searching crash course');

			/* retreive specific channel playlists for channel id
			var crashCourseReq = gapi.client.youtube.playlists.list({part:'snippet',channelId:'UCX6b17PVsYBQ0ip5gyeme-Q',maxResults:25});
			*/

			/* retreive specific playlist items for playlist id
			var crashCourseReq = gapi.client.youtube.playlistItems.list({part:'snippet',playlistId:'PL8dPuuaLjXtOAKed_MxxWBNaPno5h3Zs8',maxResults:50});
			*/

			//search a specific channel
			console.log('specific search for: '+text);
			var crashCourseReq = gapi.client.youtube.search.list({part:'snippet',channelId:'UCX6b17PVsYBQ0ip5gyeme-Q',maxResults:50,q:text});
			
			//execute the query
			crashCourseReq.execute(function (response){
				console.log(response);
				_(response.items).each(function (result){
					console.log("some result: "+result);
					var formattedResult = {};
					formattedResult.title = result.snippet.title;
					formattedResult.desc = result.snippet.description;
					formattedResult.thumb = result.snippet.thumbnails.default.url;
					formattedResult.from = 'youtube';
					formattedResult.rank = 2;
					formattedResult.channel = result.snippet.channelTitle;
					formattedResult.youtubeUrl = 'http://www.youtube.com/watch?v='+result.id.videoId;
					formattedResult.link = 'http://www.youtube.com/user/'+result.snippet.channelTitle;

					formattedResults.push(formattedResult);

				});
				console.log(formattedResults);
				youtubePromise.resolve(formattedResults);
			});


			return youtubePromise.promise;	

		};

		

		//end service
		return youtube;
	});

