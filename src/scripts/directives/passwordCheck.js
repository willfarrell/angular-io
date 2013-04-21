/*global */
/*
To Do
check $setValidity(validationErrorKey, isValid) - http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController
*/

angular.module('io.directives')
.directive('passwordCheck', ['io.config', '$timeout', function(config_obj, $timeout) {
	var config = config_obj.password;
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, controller) {
			
			// init
			controller.$error.minlength = false;
			controller.$error.identical = false;
			controller.$error.lower = false;
			controller.$error.upper = false;
			controller.$error.number = false;
			controller.$error.special = false;
			controller.$error.other = false;
			controller.$error.subset = false;
			controller.$error.sameas = false;
			
			function check(e) {
				var value = controller.$viewValue;
				if (!value) { return; }
				
				controller.$error.identical = /(.){3}/.test(value);
				
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
				
				controller.$error.minlength = (l < config.min_length);
				
				// must have n/4 params at min
				var subset = (params.lower[0]+params.upper[0]+params.number[0]+params.special[0]+params.other[0] < config.min_subset);
				controller.$error.subset = subset;
				//if (params.lower[0]+params.upper[0]+params.number[0]+params.special[0]+params.other[0] < config.min_subset) {
					controller.$error.upper = subset && (params.upper[1] < config.min_upper);
					controller.$error.lower = subset && (params.lower[1] < config.min_lower);
					controller.$error.number = subset && (params.number[1] < config.min_number);
					controller.$error.special = subset && (params.special[1] < config.min_special);
					controller.$error.other = subset && (params.other[1] < config.min_other);
				//}
				
				controller.$error.sameas = (value === attrs.sameas);
				
				//},0);
				
			}
			
			element.bind('keyup', check);
			
			controller.$render = check;
		}
	};
}]);
