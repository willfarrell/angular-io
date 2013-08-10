/*globals db:true, keyDB:true */
// version 0.1.0

//(function (angular) {
angular.module('io.factories')
.factory('$localStorage', [function() {
	//console.log('localStorage');
	var db_copy = db;
	db_copy.init();
	return db;
}]);

angular.module('io.services', ['$provide', function($provide) {
	$provide.factory('$keyDB', ['$localStorage', function($localStorage) {
		return keyDB;
	}]);
}]);

angular.module('io.factories')
.factory('$sessionStorage', [function() {
	//console.log('sessionStorage');
	var db_copy = db;
	db_copy.init(true);
	return db;
}]);
//})(angular);