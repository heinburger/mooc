/*global angular */
angular.module('mooc')
	.factory('twitter', function ($http, $q) {
		'use strict';

		var twitter = {};

		twitter.initialize = function() {
			var initPromise = $q.defer();
			//$('#twitter').removeClass('unloaded');


			var cKey = 'gvudUqhP2mLhumgFky4FMvifV';
			var cSecret = 'PXUMXqjwXTsae12Hud1x7yHuP3JjjeqgWH6Xq5xoQjTejUjret';
			var base64 = btoa(cKey + ':' + cSecret);
			

			
			$.ajax({
			    url: 'https://api.twitter.com/oauth2/token',
			    jsonpCallback: 'jsonCallback',
			    beforeSend: function (request) {
	                request.setRequestHeader('Authorization', 'Basic '+ base64);
	            },
			    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
			    dataType: 'jsonp',
			    data: 'grant_type=client_credentials',
			    success: function(response) {
					console.log(response)
			    },
			    error: function(e) {
			       console.log(e);
			    }
			});

			

			initPromise.resolve('twitter');
			

			
			return initPromise.promise;
		};	

		twitter.textSearch = function(text, options) {
			var twitterPromise = $q.defer();
			var promises = [];
			var allResults = [];

			
			
			$q.all(promises).then(function(){
				twitterPromise.resolve(allResults);
			});			

			return twitterPromise.promise;
		};

		//end service
		return twitter;
	});

