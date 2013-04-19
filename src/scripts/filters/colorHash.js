angular.module('io.filters')
.filter('colorHash', function() {
	return function(string) {
		var hash = 0;
		for (var i = 0, l = string.length; i < l; i++) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}
		return ((hash>>24)&0xFF).toString(16) +
				((hash>>16)&0xFF).toString(16) +
				((hash>>8)&0xFF).toString(16) +
				(hash&0xFF).toString(16);
	};
});