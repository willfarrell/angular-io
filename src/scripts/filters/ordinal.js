angular.module('io.filters')
.filter('ordinal', function() {
	return function(num) {
		var s=['th','st','nd','rd'],
		v=num%100;
		return num+(s[(v-20)%10]||s[v]||s[0]);
	};
});