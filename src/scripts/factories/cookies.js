// replacement for ngCookies
// @willFarrell
// works in IE

/**
 * @license AngularJS v1.0.6
 * (c) 2010-2012 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {
	'use strict';

	/**
	* @ngdoc overview
	* @name ngCookies
	*/


	angular.module('ngCookies', ['ng'])

		/**
		* @ngdoc object
		* @name ngCookies.$cookie
		* @requires $browser
		*
		* @description
		* Provides read/write access to browser's cookies.
		*
		* A granular level access to cookies
		*
		* @example
		*/
		.factory('$cookie', ['$window', function ($window) {
			var doc = $window.document,
				config = {
					days: 14,
					hours: 0,
					path: '',	// use '' for default
					domain: '', // leading . will allow subdomains also to access cookie - window.location.hostname
					secure: false
				},
				$scope = {};

			// Set config params
			$scope.defaults = function(params) {
				params = params || config;
				for (var i in config) {
					if (config.hasOwnProperty(i) && params.hasOwnProperty(i)) {
						config[i] = params[i];
					}
				}
			};

			/**
			*	Don't pass a key to return all
			*/
			$scope.get = function(key) {
				// angular.fromJson($cookies[key]);
				var keyEQ = key + '=',
					ca = doc.cookie.split(';'),
					cookies = {},
					cookie,
					i,c;
				for (i = 0; i < ca.length; i++) {
					c = ca[i];
					while (c.charAt(0) === ' ') { c = c.substr(1); }
					if (key && c.indexOf(keyEQ) === 0) { return c.substr(keyEQ.length);}
					else if (c) {
						cookie = c.split('='),
						cookies[cookie[0]] = cookie[1];
					}
				}
				if (key) { return null; }
				else { return cookies; }
			};

			$scope.put = function(key, value, params) {
				params = params || {};
				var expires = '', date,
					cookie_string, i,
					current_cookies = doc.cookie;

				if (typeof(value) === 'undefined' || value === null) {
					value = '';
					params.days = -1;
				} else if (typeof(value) !== 'string') {
					value = angular.toJson(value);
				}

				// sync params with defaults
				for (i in config) {
					if (config.hasOwnProperty(i)) {
						if (!params.hasOwnProperty(i)) { params[i] = config[i]; }
					}
				}

				if (params.days || params.hours) {
					date = new Date();
					date.setTime(date.getTime() + (params.days * 24 * 60 * 60 * 1000) + (params.hours * 60 * 60 * 1000));
					expires = '; expires=' + date.toGMTString();
				}
				cookie_string = key + '=' + value + expires;
				cookie_string += '; path=' + (config.path.length ? config.path : '/');
				if ( config.domain.length ) {
					cookie_string += '; domain=' + config.domain;
				}
				if ( config.secure ) {
					cookie_string += '; secure';
				}

				doc.cookie = cookie_string;

				if (doc.cookie.length > 4096) {
					console.warn('Cookie "'+ key +'" possibly not set or overflowed because it was too large (' + doc.cookie.length + ' > 4096 bytes)!');
					doc.cookies = current_cookies;
				}
			};

			$scope.remove = function(key) {
				$scope.put(key, null);
			};

			return $scope;
		}])

		/**
		* @ngdoc object
		* @name ngCookies.$cookies
		* @requires $browser
		*
		* @description
		* Provides read/write access to browser's cookies.
		*
		* Only a simple Object is exposed and by adding or removing properties to/from
		* this object, new cookies are created/deleted at the end of current $eval.
		*
		* @example
		*/
		.factory('$cookies', ['$rootScope', '$browser', '$cookie', function ($rootScope, $browser, $cookie) {
			var cookies = {},
				lastCookies = {},
				lastBrowserCookies,
				runEval = false,
				copy = angular.copy,
				isUndefined = angular.isUndefined;

			/**
			* Pushes all the cookies from the service to the browser and verifies if all cookies were stored.
			*/
			function push() {
				var name,
					value,
					browserCookies,
					updated;

				//delete any cookies deleted in $cookies
				for (name in lastCookies) {
					if (isUndefined(cookies[name])) {
						//$browser.cookies(name, undefined);
						$cookie.remove(name);
					}
				}

				//update all cookies updated in $cookies
				for (name in cookies) {
					if (cookies.hasOwnProperty(name)) {
						value = cookies[name];
						if (!angular.isString(value)) {
							if (angular.isDefined(lastCookies[name])) {
								cookies[name] = lastCookies[name];
							} else {
								delete cookies[name];
							}
						} else if (value !== lastCookies[name]) {
							//$browser.cookies(name, value);
							$cookie.put(name, value);
							updated = true;
						}
					}
				}

				//verify what was actually stored
				if (updated) {
					updated = false;
					//browserCookies = $browser.cookies();
					browserCookies = $cookie.get();

					for (name in cookies) {
						if (cookies[name] !== browserCookies[name]) {
							//delete or reset all cookies that the browser dropped from $cookies
							if (isUndefined(browserCookies[name])) {
								delete cookies[name];
							} else {
								cookies[name] = browserCookies[name];
							}
							updated = true;
						}
					}
				}
			}

			//creates a poller fn that copies all cookies from the $browser to service & inits the service
			$browser.addPollFn(function() {
				var currentCookies = $browser.cookies();
				//var currentCookies = $cookie.get();
				if (lastBrowserCookies !== currentCookies) { //relies on browser.cookies() impl
					lastBrowserCookies = currentCookies;
					copy(currentCookies, lastCookies);
					copy(currentCookies, cookies);
					if (runEval) { $rootScope.$apply(); }
				}
			})();

			runEval = true;

			//at the end of each eval, push cookies
			//TODO: this should happen before the "delayed" watches fire, because if some cookies are not
			//	strings or browser refuses to store some cookies, we update the model in the push fn.
			$rootScope.$watch(push);

			return cookies;
		}])

		/**
		* @ngdoc object
		* @name ngCookies.$cookieStore
		* @requires $cookies
		*
		* @description
		* Provides a key-value (string-object) storage, that is backed by session cookies.
		* Objects put or retrieved from this storage are automatically serialized or
		* deserialized by angular's toJson/fromJson.
		* @example
		*/
		.factory('$cookieStore', ['$cookies', function($cookies) {

			return {
				/**
					* @ngdoc method
					* @name ngCookies.$cookieStore#get
					* @methodOf ngCookies.$cookieStore
					*
					* @description
					* Returns the value of given cookie key
					*
					* @param {string} key Id to use for lookup.
					* @returns {Object} Deserialized cookie value.
					*/
				get: function(key) {
					return angular.fromJson($cookies[key]);
				},

				/**
				* @ngdoc method
				* @name ngCookies.$cookieStore#put
				* @methodOf ngCookies.$cookieStore
				*
				* @description
				* Sets a value for given cookie key
				*
				* @param {string} key Id for the `value`.
				* @param {Object} value Value to be stored.
				*/
				put: function(key, value) {
					$cookies[key] = angular.toJson(value);
				},

				/**
					* @ngdoc method
					* @name ngCookies.$cookieStore#remove
					* @methodOf ngCookies.$cookieStore
					*
					* @description
					* Remove given cookie
					*
					* @param {string} key Id of the key-value pair to delete.
					*/
				remove: function(key) {
					delete $cookies[key];
				}
			};
		}]);
})(window, window.angular);