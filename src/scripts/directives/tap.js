// TouchStart is faster than click, that's why we add this here as a
// directive. Use `ng-tap` in code rather than `ng-click`.
// https://github.com/comoyo/ffos-list-detail/blob/master/www/js/app.js
angular.module('io.directives')
.directive('ngTap', function() {
	var isTouch = !!('ontouchstart' in window);
	return function(scope, elem, attrs) {
		// if there is no touch available, we'll fall back to click
		if (isTouch) {
			var tapping = false;
			elem.bind('touchstart', function() {
				tapping = true;
			});
			// prevent firing when someone is f.e. dragging
			elem.bind('touchmove', function() {
				tapping = false;
			});
			elem.bind('touchend', function() {
				if (tapping) {
					scope.$apply(attrs.ngTap);
				}
			});
		}
		else {
			elem.bind('click', function() {
				scope.$apply(attrs.ngTap);
			});
		}
	};
});
