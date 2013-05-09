
// AngularIO (io)
angular.module('io.config', []).value('io.config', {
	// modules/templateurl.js
	'views': 'views/',	// must end with /
	// directives/passwordCheck.js
	//'password': 'json/config.password.json',
	// filters/markdown.js
	/*
	https://github.com/chjj/marked
	pedantic: Conform to obscure parts of markdown.pl as much as possible. Don't fix any of the original markdown bugs or poor behavior.
	gfm: Enable github flavored markdown (enabled by default).
	sanitize: Sanitize the output. Ignore any HTML that has been input.
	highlight: A callback to highlight code blocks.
	tables: Enable GFM tables. This is enabled by default. (Requires the gfm option in order to be enabled).
	breaks: Enable GFM line breaks. Disabled by default.
	smartLists: Use smarter list behavior than the original markdown. Disabled by default. May eventually be default with the old behavior moved into pedantic.
	langPrefix: Set the prefix for code block classes. Defaults to lang-.
	$scope.markdown.setOptions({
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	langPrefix: 'lang-',
	highlight: function(code, lang) {
			if (lang === 'js') {
				return highlighter.javascript(code);
			}
			return code;
		}
	});*/
	'markdown': {
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: true,
		smartLists: true
	}
});
angular.module('io.controllers', ['io.config']);
angular.module('io.directives', ['io.config', 'io.factories', 'io.config']);
angular.module('io.factories', ['io.config']);
angular.module('io.filters', ['io.config', 'io.factories', 'io.config']);
angular.module('io.modules', ['io.config']);	// mix of types
angular.module('io', ['io.controllers', 'io.directives', 'io.factories', 'io.filters', 'io.modules', 'io.config']);
