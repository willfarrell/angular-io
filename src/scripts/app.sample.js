
// AngularIO (io)
angular.module('io.config', []).value('io.config', {
	'client'		:'',				// https://static.domain.com
	'server'		:'',				// https://api.domain.com
	'dashboard'		:'/app',				// app dashboard ie #/app - special button
	//'offline'		:[],		//'class':{							// add in classes at root level ($rootScope.class_name.class_attr)
		//'validate':validate,			// validation (password)
		//'filepicker':filepicker,		// file picker
		//'follow':{},					// follow		//},
	'i18n':{
		'default'	:'en',				// default locale
		'lang'		:[					// array of file names, in lang only folder ie en
			//'countries',				// {'country_code':'country_name'}
			//'languages'				// {'en-ca':'English (Canadian)'}
		],
		'lang-locale':[					// array of file names, in locale folder ie en-ca
			'angular-io',
			'app'
		],
		// load json files into $rootScope.json[key] = JSON.parse(file);
		'json'		:[						// array of file names, in lang only folder ie en to be placed in a list
			'countries',					// {'country_code':'country_name'}
			'languages',					// {'en-ca':'English (Canadian)'}
			'user_levels'
		],
		'options'	:['en']					// which locales to allow
	},
	'json':{								// load json files into $rootScope.json[key] = JSON.parse(file);
		'calling_codes'	:'calling_codes'	// {'country_code':'calling_code'}
	},
	'password':{				// As per OWASP
		'min_length'	:10,	// OWASP:10
		'min_subset'	:3,		// OWASP:3
		'min_upper'		:1,		// OWASP:1
		'min_lower'		:1,		// OWASP:1
		'min_number'	:1,		// OWASP:1
		'min_special'	:1,		// OWASP:1
		'min_other'		:1		// OWASP:1
	},
	'account': {
		'user_name'		:false,	// Require username in profile
		'company'		:false,
		'company_username':false
	},
	// pulgins //
	// onboard - view/onboard
	'onboard':{
		'required'		:true,		// always true
		'start'			:'user'		// ** make smart so not needed
	},
	'follow':'user',
	
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
angular.module('io.directives', ['io.config']);
angular.module('io.factories', ['io.config']);
angular.module('io.filters', ['io.config']);
angular.module('io.modules', ['io.config']);	// plugins (mix of types)
angular.module('io.modernizr', []);
angular.module('io', ['io.controllers', 'io.directives', 'io.factories', 'io.filters', 'io.modules', 'io.modernizr', 'io.config']);
