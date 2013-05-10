angular.module('io.filters')
.filter('pad', function() {
	return function(string, length, pad_char, append) {
		string = string.toString();
		length = parseInt(length, 10) || 1;
		pad_char = pad_char || ' ';

		while (string.length < length) {
			string = append ? string+pad_char : pad_char+string;
		}
		return string;
	};
});