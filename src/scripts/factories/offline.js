/*
To Do
- watch login state, run que

*/

angular.module('io.factories')
.factory('$offline', ['io.config', '$window', '$http', '$timeout', '$localStorage', '$session', function(config, $window, $http, $timeout, $localStorage, $session) {
	console.log('offlineFactory');
	var $scope = {};
	
	// vars
	$scope.state = $localStorage.get('offline.state', !$window.navigator.onLine);
	$scope.requests = $localStorage.get('offline.requests', []);
	$scope.loading = false;
	
	$scope.store = function() {
		$scope.state = $localStorage.set('offline.state', $scope.state);
		$scope.request = $localStorage.set('offline.requests', $scope.requests);
	};
	
	$scope.que_request = function(http_config, callback) {
		console.log('offline.que_request(http_config, callback)');
		callback = callback || function(){};
		$scope.requests.push({http_config:http_config, callback:callback});
		$scope.store();
	};
	
	$scope.run_request = function() {
		console.log('offline.run_request()');
		if (!$scope.requests.length) { return; }
		$scope.loading = true;
		
		var request = $scope.requests.shift();
		console.log('offline.run_request.http(', request.http_config.method, request.http_config.url, JSON.stringify(request.http_config.data), ')');
		$http(request.http_config)
			.success(function(data, status, headers, config) {
				console.log('offline.run_request.http.success');
				
				if (request.callback) { request.callback(data, status, headers, config); }
				$scope.loading = false;
				$scope.store();
				$scope.run_request();
			})
			.error(function(data, status, headers, config) {
				console.log('offline.run_request.http.error');
				console.log(data, status, headers, config);
				$scope.requests.unshift(request);
				$scope.loading = false;
			});
	};
	
	// move to app ui layer
	/*$scope.alertOffline = function() {
		console.log('offline.alertOffline()');
		$rootScope.modal = {
			hide:{
				header:false,
				close:false,
				footer:false
			},
			header:$rootScope.i18n.alert_online_offline_label,
			content:$rootScope.i18n.alert_online_offline_message,
			buttons:[
				{
					'class':'btn-primary',
					value:'Ok',
					callback:function(){}
				}
			]
		};
		//$('#alertModal').modal('show');
	};
	$scope.alertOnline = function() {
		console.log('offline.alertOnline()');
		$rootScope.modal = {
			hide:{
				header:false,
				close:false,
				footer:false
			},
			header:$rootScope.i18n.alert_offline_online_label,
			content:$rootScope.i18n.alert_offline_online_message,
			buttons:[
				{
					'class':'btn-primary',
					value:'Ok, Thanks!',
					callback:function(){}
				}
			]
		};
		//$('#alertModal').modal('show');
	};*/
	//$scope.run_request();
	// $http.get().error()
	
	/*
	$rootScope.$watch('session.user_ID', function(value) {
		if (value) {
			$scope.run_request();
		}
	});
	*/
	
	$window.addEventListener('online', function () {
		
		console.log('Event online');
		if ($scope.state) {	// was offline
			//$scope.alertOnline();
			$timeout(function() {  // timeout is required to bypass some weird bug in angular **
				$session.check(function(){
					$scope.run_request();
				});
			}, 0);
		}
		$scope.state = false;
		//$rootScope.$digest();
	}, true);
	
	$window.addEventListener('offline', function () {
		console.log('Event offline');
		$scope.state = true;
		//$scope.alertOffline();
		//$rootScope.$digest();
	}, true);
	
	return $scope;
}]);
