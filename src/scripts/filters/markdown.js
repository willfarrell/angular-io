/*global marked:true */

/*
Requires:
lib/marked.js

To Do:
- add ng-bind-html-unsafe hook
*/

angular.module('io.filters')
.filter('markdown', ['io.config', function(config) {
	return function(string) {
		marked.setOptions(config.markdown);
		return marked(string).trim();
	};
}]);