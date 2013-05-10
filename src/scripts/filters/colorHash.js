/*
round Hex to color

// http://flatuicolors.com/
#1abc9c
#2ecc71
#3498db
#9b59b6
#34495e
#16a085
#27ae60
#2980b9
#8e44ad
#2c3e50
#f1c40f
#e67e22
#e74c3c
#ecf0f1
#95a5a6
#f39c12
#e74c3c



*/

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
