/*global angular */
angular.module('mooc')
	.controller('moocCtrl', function moocCtrl($scope, $routeParams, $filter, agg, khan) {
		'use strict';

		//setup default
		var defaultResult = [{title:'Start seaching for some shit...', desc:'keep it simple.. right now this is only searching videos (restricted to Khan as that is the only service that was built). As this progresses, it could be used to find articles/classes/learning materials/other open courseware/etc... The best part will be how the material is sorted - like beginner shit to advances.. and as you view/read/whatever, the material is "doned" and it forms some sort of path for learning more on that particular search term/concept... lots of cool stuff here'}];
		var noResult = [{title:'Nothing matches', desc:'try another search or ADD TO THE ENGINE'}];
		
		$scope.results = defaultResult;
		$scope.services = ['khan'];

		$scope.addService = function (service) {
			if (_($scope.services).contains(service)) {
                $scope.services = _($scope.services).without(service);
                $('#'+service).addClass('grayscale');
            } else { 
                $scope.services.push(service); 
                $('#'+service).removeClass('grayscale');
            }
		};
		$scope.printServices = function (){
			if (!$scope.services.length) { return 'nothing'; }
			return $scope.services.join(', ');
		};


		$('#slider').slider({
			formatter: function(value) {
				return 'videos less than ' + value + ' min';
			}
		});

		$('#slider').on('slide', function (slide){
			agg.filterDuration = slide.value * 60;
			$scope.$apply();
		});

		$scope.durationFilter = function() {
	        return function(item) {        
	        	if (!item.duration) { return true; }                  
	            else if ( item.duration < agg.filterDuration) {                
	                return true;
	            } else {                
	                return false;
	            }
	        }
	    };

		$scope.doSearch = function (text) {
			//if (text!=='' && text!==undefined) {
			var tempResults = [];
			tempResults = khan.search(text,true);
			if (!tempResults.length) { tempResults = noResult; }
			angular.copy(tempResults, $scope.results);

		};
		
	});