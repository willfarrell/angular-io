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
		if (config[id] && typeof(config[id]) === 'string' && config[id].substr(-4) === 'json') {
			$http.get(config[id])
				.success(function(data, status){
					config[id] = data;
					/*for (var i in data) {
						if (data.hasOwnProperty(i)) {
							config[i] = data[i];
						}
					}*/
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
