// version 0.1.0

//(function (angular) {
angular.module('io.factories')
.factory('$time', ['$timeout', function($timeout) {
	var $scope = {},
		now = 0,		// latest timestamp
		times = {},	// holds clock timestamps
		loops = {};	// holds $timeouts
	
	$scope.get = function(id) {
		id = id || '_';
		return times[id] || now;
	};
	
	$scope.set = function(interval, id) {
		id = id || '_';
		var operation = function(){
			now = +new Date();
			times[id] = now;
		};
		operation();
		$scope.setInterval(interval, operation, id);
	};
	
	$scope.clear = function(id) {
		id = id || '_';
		$timeout.cancel(loops[id]);
	};
	
	// general usecase setInterval
	$scope.setInterval = function(interval, operation, id, scope) {
		id = id || '_';
		interval = interval || 60000; // default = 1min
		operation = operation || function(){};
			
		loops[id] = $timeout(function update() {
			operation( scope || undefined ); // additional processing callback
			loops[id] = $timeout(update, interval);
		}, interval);
	};
		
	return $scope;
}]);

//})(angular);