/*global */

angular.module('io.directives')
.directive('inputMask', ['$filter', function($filter) {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, controller) {
			/*
			console.log(scope);
			console.log(element);
			console.log(attrs);
			console.log(controller);
			*/
			
			//console.log($filter('format'));
			
			function mask() {
				if (!controller.$viewValue) { return; }
				
				var value = $filter('format')(controller.$viewValue, attrs.inputMask);
				element.val(value);
				controller.$setViewValue(value.replace(/[^a-zA-Z0-9]+/g,''));
			}
			
			// view -> model
			element.bind('keyup', function(event) {
				//console.log('inputMask');
				
				// see ui-keypressHelper
				var shiftPressed = event.shiftKey;
				var keyCode = event.keyCode;
				var cursorPos = element.prop('selectionStart');
				// normalize keycodes
				if (!shiftPressed && keyCode >= 97 && keyCode <= 122) {
					keyCode = keyCode - 32;
				}
				if (keyCode >= 48 && keyCode <= 90) {
					scope.$apply(function() {
						mask();
					});
				}
			});
			
			// model -> view
			controller.$render = function() {
				mask();
			};
			
			mask();
		}
	};
}]);