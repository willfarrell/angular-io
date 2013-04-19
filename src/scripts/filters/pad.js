angular.module('io.filters')
// phone number {{ value | phone }}
.filter('pad', function() {
	return function(string, length, padding, append) {
		string = string.toString();
		length = length || 1;
		padding = padding || ' ';
		
		while (string.length < length) {
			string = append ? string+padding : padding+string;
		}
		return string;
	};
})