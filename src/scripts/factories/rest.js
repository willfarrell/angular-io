// version 0.1.0
/*

add localstorage caching w/ fallback

usecase:
$rest(http_config, http_callback, cache_ID, cache_key)

*/
//(function (angular) {
angular.module('io.factories')
.factory('$rest', ['io.config', '$rootScope', '$http', '$cookies', '$localStorage', '$offline', function(config, $rootScope, $http, $cookies, $localStorage, $offline) {
	console.log('restFactory');
	
	var $scope = {};
	
	$scope.reset = function() {
		$rootScope.alerts = [];
		$rootScope.errors = {};
	};
	
	$scope.check = function(data, status, headers, config) {
		console.log(data);
		var result = true;
		// session check ... signout?
		if (data.session === 'signout') {
			//$rootScope.offline.que_request(http_config, http_callback);
			if ($rootScope.uri().match(/\/sign\//) === null) { // prevent redirect loop
				$cookies.redirect = $rootScope.uri();
				$rootScope.href('/sign/out');
			}
			result = false;
		}
		// alert and errors
		if (result && data.alerts) {
			$rootScope.alerts = data.alerts;
			result = false;
		}
		if (data.errors) {
			$rootScope.errors = data.errors;
			result = false;
		}
		// if all good return true
		return result;
	};
	
	
	$scope.http = function(http_config, http_success_callback, http_error_callback) { // , $keyDB, cacke_key
		console.log(http_config, http_success_callback, http_error_callback);
		// if there is a cache, load it in now, update with request later
		/*if (http_config.method === 'get' && cache_key) {
			
		}*/
		
		$http(http_config)
			.success(function(data, status, headers, config) {
				console.log('restFactory.'+http_config.method+'.success');
				if ($scope.check(data, status, headers, config)) {
					// cache in localstorage
					// ** do
					// callback
					if (http_success_callback) { http_success_callback(data, status, headers, config); }
				}
			})
			.error(function(data, status, headers, config) {
				console.log('restFactory.'+http_config.method+'.error');
				$rootScope.alerts.push({'class':'error', 'label':'Connection Error:', 'message':'We were unable to complete you request at this time.'});
				$offline.que_request(http_config, http_success_callback);
				if (http_error_callback) { http_error_callback(data); }
			});
	};
	
	return $scope;
}]);

//})(angular);
