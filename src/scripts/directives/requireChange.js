
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
			
			function check(value) {
				//console.log(original,value);
				// initial set
				if (!original) {
					original = value;
				}
				//console.log(original,value);
				
				// check
				if (original === value) {
					//console.log('disable');
					scope.form.$invalid = true;
				} else if (scope.form.$valid === true) {
					scope.form.$invalid = false;
				}
			}
			
			attrs.$observe('requireChange', check);
			//attrs.$observe('requireChange', function() { $timeout(check,0); });
		}
	};
}]);
