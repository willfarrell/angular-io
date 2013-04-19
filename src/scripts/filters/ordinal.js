/*
Requires:
- lang: en

TODO
- use locale string appends
*/

angular.module('io.filters')
.filter('ordinal', function() {
	return function(num) {
		var append=['th','st','nd','rd'],
			value=num%100;
		return num+(append[(value-20)%10]||append[value]||append[0]);
	};
});