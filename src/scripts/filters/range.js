angular.module('io.filters')
.filter('range', function() {
	return function(input, start, end, step) {
		var tmp, i;

		if (!end || isNaN(end)) {
			end = start;
			start = 0;
		}
		if (!step || isNaN(step)) {
			step = 1;
		}
		start = parseInt(start, 10);
		end = parseInt(end, 10);
		// flip start/end
		if (start > end) {
			tmp = start;
			start = end;
			end = tmp;
		}
		for (i=start; i<=end; i += step) {
			input.push(i.toString());
		}
		return input;
	};
});
