/*
TODO

*/

angular.module('io.filters')
// phone number {{ value | phone }}
.filter('format', function() {
	return function(string, mask) {
		if (!string || !mask) { return string; }

		var defs = {
			'9': '[0-9]',
			'a': '[A-Za-z]',
			'*': '[A-Za-z0-9]',
			// regex
			'w': '[\\w]',
			'W': '[\\W]',
			's': '[\\s]',
			'S': '[\\S]',
			'd': '[\\d]',
			'D': '[\\D]'
		};
		var output = '';
		var string_pos = 0;
		var mask_pos = 0;
		string = string.toString(10);
		string.split('');
		mask.split('');
		while (mask_pos < mask.length && string_pos < string.length) {
			var s = string[string_pos];
			var f = mask[mask_pos];
			if (defs[f]) {
				var regex = new RegExp(defs[f]);
				if (regex.exec(s)) {
					output += s;
					mask_pos++;
				}
				string_pos++;
			} else {
				output += f;
				mask_pos++;
			}

		}
		return output;
	};
});