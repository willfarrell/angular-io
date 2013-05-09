/*globals */
// version 0.1.0
// Use Case:
// var config = {};
// $config.get('password', config, function(value){ config = value; });

//(function (angular) {
angular.module('io.factories')
.factory('$config', ['io.config', '$http', function(config, $http) {
	//console.log('localStorage');
	var $scope = {};
	
	$scope.get = function(id, default_obj, callback) {
		if (config[id] && config[id].substr(-4) === 'json') {
			$http.get(config[id])
				.success(function(data, status){
					config[id] = data;
					if (status === 200) {
						callback(data);
					} else {
						callback(default_obj);
					}
				});
		} else {
			callback(config[id] || default_obj);
		}
	};
	
	
	return $scope;
}]);