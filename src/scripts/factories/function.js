// version 0.1.0
// to be phased out
//(function (angular) {
angular.module('io.factories')
.factory('$function', function() {
	var $scope = {};
	
	// refactor - (obj, default)
	$scope.syncVar = function(new_obj, old_obj) {
		if (old_obj === undefined) {
			//log("old_obj = undefined");
			old_obj = new_obj;
		} else if (typeof(new_obj) === 'object' && typeof(old_obj) === 'object') {
			//log("new_obj = Object");
			old_obj = $scope.syncObject(new_obj, old_obj);
		} else if (typeof(new_obj) === 'array' && typeof(old_obj) === 'array') {
			//log("new_obj = Array");
			old_obj = $scope.syncArray(new_obj, old_obj);
		}
		return old_obj;
	};
	
	$scope.syncObject = function(new_obj, old_obj) {
		//log("==sync_loop_object==");
		//log("new");
		//log(new_obj);
		//log("old");
		//log(old_obj);
		for (var i in new_obj) {
			//console.log("new typeof "+typeof(new_obj[i]));
			if (old_obj[i] === undefined) {
				//log("old_obj = undefined");
				old_obj[i] = new_obj[i];
			} else if (typeof(new_obj[i]) === 'object') {
				//log("new_obj = Object");
				old_obj[i] = $scope.syncObject(new_obj[i], old_obj[i]);
			} else if (typeof(new_obj[i]) === 'array') {
				//log("new_obj = Array");
				old_obj[i] = $scope.syncArray(new_obj[i], old_obj[i]);
			} else {	// string, number, bool, etc
				old_obj[i] = new_obj[i];
			}
			//log("old state");
			//log(old_obj);
		}
		return old_obj;
	};
	
	// replace with array1.concat(array2); ??
	$scope.syncArray = function(new_obj, old_obj) {
		//log("==sync_loop_array==");
		//log("new");
		//log(new_obj);
		//log("old");
		//log(old_obj);
		for (var i = 0, l = new_obj.length; i < l; i++) {
			//log("new typeof "+typeof(new_obj[i]));
			if (typeof(new_obj[i]) === 'object') {
				//log("new_obj = Object");
				old_obj.push($scope.syncObject(new_obj[i], old_obj[i]));
			} else if (typeof(new_obj[i]) === 'array') {
				//log("new_obj = Array");
				old_obj.push($scope.syncArray(new_obj[i], old_obj[i]));
			} else {
				//log("new_obj = Other");
				old_obj.push(new_obj[i]);
			}
			//log("old state");
			//log(old_obj);
		}
		return old_obj;
	};

	$scope.objectIsEmpty = function(obj) {
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				return false;
			}
		}
		return true;
	};

	$scope.objectLength = function(obj) {
		var c = 0;
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				++c;
			}
		}
		return c;
	};
	
	// replaced with filter
	/*$scope.objectArray = function(obj) {
		var arr = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				arr.push(obj[i]);
			}
		}
		return arr;
	};*/
		
	return $scope;
});

//})(angular);
