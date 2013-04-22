/*globals db:true, keyDB:true */
// version 0.1.0

//(function (angular) {
angular.module('io.factories')
.factory('$localStorage', ['$timeout', function($timeout) {
	//console.log('localStorage');
	return db;
}]);

angular.module('io.services', ['$provide', function($provide) {
	$provide.factory('$keyDB', ['$localStorage', function($localStorage) {
		return keyDB;
	}]);
}]);
//})(angular);