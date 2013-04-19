/*global marked:true */

angular.module('io.filters')
.filter('markdown', ['io.config', function(config) {
	return function(string) {
		marked.setOptions(config.markdown);
		return marked(string).trim();
	};
}]);