/*
TODO

*/

angular.module('io.filters')
.filter('objectArray', function() {
	return function(object) {
		var array = [];
		for (var i in object) {
			if (object.hasOwnProperty(i)) {
				array.push(object[i]);
			}
		}
		return array;
	};
});
