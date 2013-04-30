angular.module('io.filters')
.filter('nl2br', function() {
	return function(string) {
		string = string.replace(/\n/g, '<br>');
		return string;
	};
});