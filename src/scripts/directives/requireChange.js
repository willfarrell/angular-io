
angular.module('io.directives')
.directive('requireChange', ['$timeout', function($timeout) {
	var original = null;
	return {
		restrict: 'A',
		required: 'ngDisabled',
		link: function(scope, element, attrs, controller) {
			//console.log(JSON.stringify(config));
			/*
			console.log(scope);
			console.log(element);
			console.log(attrs);
			console.log(controller);
			*/
			
			function init() {
				original = null;
				check(attrs.requireChange);
			}
			
			function prepare(value) {
				// sort and remove blank elems
				var json = JSON.parse(value),
					json_sort = {},
					keys = Object.keys(json);

				keys.sort();

				for (var i = 0, l = keys.length; i < l; i++) {
					if (json[keys[i]] !== '') {
						json_sort[keys[i]] = json[keys[i]];
					}
				}

				return JSON.stringify(json_sort);
			}

			function check(value) {
				//console.log('requireChange(', original, value, ')');
				if (value) { value = prepare(value); }
				// initial set
				if (!original && value !== '{}') {
					original = value;
				}

				// check
				//console.log(original, '==', value);
				if (original === value) {
					scope.form.$invalid = true;
				} else if (scope.form.$valid === true) {
					scope.form.$invalid = false;
				}
				/*if (original === value) {
					console.log('disable');
					scope.form.$invalid = true;
				} else if (scope.form.$valid === true) {
					scope.form.$invalid = false;
				}*/
			}
			
			element.bind('click', function() { init(); });
			attrs.$observe('requireChange', check);
		}
	};
}]);
