angular.module('io.filters')
.filter('colorHash', function() {
	function hashCode(str) { // java String#hashCode
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	}
	
	function intToARGB(i){
		return ((i>>24)&0xFF).toString(16) +
				((i>>16)&0xFF).toString(16) +
				((i>>8)&0xFF).toString(16) +
				(i&0xFF).toString(16);
	}

	return function(string) {
		var pad = new Array(7).join(0);
		
		return (pad + intToARGB(hashCode(string))).slice(-pad.length);
	};
});