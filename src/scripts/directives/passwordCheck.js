/*global */
/*
To Do
check $setValidity(validationErrorKey, isValid) - http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController
*/

angular.module('io.directives')
//.directive('passwordCheck', ['io.config', '$timeout', '$http', function(config_obj, $timeout, $http) {
.directive('passwordCheck', ['$config', '$timeout', '$http', function($config, $timeout, $http) {
	// Defaults to OWASP Specs
	var config = {
		'min_length'	:10,	// OWASP:10
		'max_identical'	:3,		// OWASP:3
		'min_subset'	:3,		// OWASP:3 How many of the below
		'min_upper'		:1,		// ABCDEFGHIJKLMNOPQRSTUVWXYZ
		'min_lower'		:1,		// abcdefghijklmnopqrstuvwxyz
		'min_number'	:1,		// 0123456789
		'min_special'	:1,		// ~!@#$%^&*()_+{}|:\'<>? `-=[];",./
		'min_other'		:1		// any other char
	};

	$config.get('password', config, function(value){ config = value; });

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, controller) {
			//console.log(JSON.stringify(config));

			// init
			function init() {
				controller.$error.minlength = false;
				controller.$error.identical = false;
				controller.$error.lower = false;
				controller.$error.upper = false;
				controller.$error.number = false;
				controller.$error.special = false;
				controller.$error.other = false;
				controller.$error.subset = false;
				controller.$error.sameas = false;
			}
			init();

			function check(e) {

				init();
				var value = controller.$viewValue;
				if (!value) { return; }

				controller.$error.identical = /(.)\1{2,}/.test(value);

				// [has,count]
				var params = {
					lower:[0,0],
					upper:[0,0],
					number:[0,0],
					special:[0,0],
					other:[0,0]
				};

				for (var i = 0, l = value.length; i < l; i++) {
					if('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(i)) > -1) { params.lower[0] = 1; ++params.lower[1]; }
					else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(value.charAt(i)) > -1) { params.upper[0] = 1; ++params.upper[1]; }
					else if ('0123456789'.indexOf(value.charAt(i)) > -1) { params.number[0] = 1; ++params.number[1]; }
					else if ('~!@#$%^&*()_+{}|:\'<>? `-=[];",./'.indexOf(value.charAt(i)) > -1) { params.special[0] = 1; ++params.special[1]; }
					else { params.other[0] = 1; ++params.other[1]; }
				}
				// console.log(JSON.stringify(params));
				controller.$error.minlength = (l < config.min_length);

				// must have n/5 params at min
				controller.$error.subset = (params.lower[0]+params.upper[0]+params.number[0]+params.special[0]+params.other[0] < config.min_subset);

				//if (params.lower[0]+params.upper[0]+params.number[0]+params.special[0]+params.other[0] < config.min_subset) {
				controller.$error.upper = controller.$error.subset && (params.upper[1] < config.min_upper);
				controller.$error.lower = controller.$error.subset && (params.lower[1] < config.min_lower);
				controller.$error.number = controller.$error.subset && (params.number[1] < config.min_number);
				controller.$error.special = controller.$error.subset && (params.special[1] < config.min_special);
				controller.$error.other = controller.$error.subset && (params.other[1] < config.min_other);
				//}

				controller.$error.sameas = (value === attrs.sameas);

				controller.$invalid = (
					controller.$error.minlength ||
					controller.$error.identical ||
					controller.$error.lower ||
					controller.$error.upper ||
					controller.$error.number ||
					controller.$error.special ||
					controller.$error.other ||
					controller.$error.subset ||
					controller.$error.sameas
				);
				controller.$valid = !controller.$invalid;
			}

			element.bind('keyup', function() { $timeout(check,0); });

			controller.$render = check;
		}
	};
}]);
