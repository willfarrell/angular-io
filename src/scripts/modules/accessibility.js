/*global db:true */
/*
To Do
- highlight of special chars
*/

angular.module('io.modules')
// apply the class accessibility-highlight to any element or to ng-view / ng-include for it to apply to nested views
// Bug: only runs on first load, can't withstand toggle
/*.directive('accessibilityHighlight', ['$timeout', function($timeout) {
	return {
		//template: '<div class="highlight"></div>',
		restrict: 'C',	// class only
		link: function(scope, element, attrs, controller) {

			function innerHighlight(node) {
				console.log(node);
				var skip = 0;
				if (node.nodeType === 3) {
					var pos = node.data.search(/[\.”"“,:;\(\)\-\[\]!@\$#%\{\}<>\*\^~\?\/\+=\|\\\']+/g);
					if (pos >= 0) {
						var spannode = document.createElement('strong');
						spannode.className = 'highlight';
						var middlebit = node.splitText(pos);
						var endbit = middlebit.splitText(1);
						var middleclone = middlebit.cloneNode(true);
						spannode.appendChild(middleclone);
						middlebit.parentNode.replaceChild(spannode, middlebit);
						return 1;
					}
				} else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
					for (var i = 0; i < node.childNodes.length; ++i) {
						i += innerHighlight(node.childNodes[i]);
					}
				}
				return skip;
			}

			$timeout(function(){
				innerHighlight(element[0]);
			},0);

		}
	};
}])*/

// Ruler - follows mouse
.directive('accessibility', ['$compile', function($compile) {
	return {
		restrict: 'C',	// class only
		link: function(scope, element, attrs, controller) {
			var ruler = $compile('<div class="ruler"></div>')(scope);
			element.append(ruler);
			element.bind('mousemove', function(e) {
				ruler.css('top', (e.clientY - 20)+'px');
			});

		}
	};
}])

// toggle service
.factory('$accessibility', ['$rootScope', '$http', function($rootScope, $http) {
	console.log('AccessibilityFactory ('+$rootScope.$id+')');
	var $scope = {};

	$scope.settings = JSON.parse(localStorage.getItem('accessibility'));
	if (!$scope.settings) {
		$scope.settings = {
			'accessibility':false
			//'dyslexic':false,
			//'zoom':1
		};
	}

	$scope.init = function() {
		console.log('$accessibility.init()');
		// accessibility
		if ($scope.settings.accessibility) {
			$scope.load();
		}
		// zoom
		//$scope.zoom($scope.settings.zoom);
	};

	$scope.save = function() {
		localStorage.setItem('accessibility', JSON.strinify($scope.settings));
		console.log($scope.settings);
	};

	$scope.toggle = function() {
		console.log('$accessibility.toggle()');
		$scope.settings.accessibility = !($scope.settings.accessibility);
		$scope.load();
	};

	$scope.load = function() {
		console.log('$accessibility.load()');
		var elem = angular.element(document.querySelector('body'));
		if ($scope.settings.accessibility) {
			elem.addClass('accessibility');
		} else {
			elem.removeClass('accessibility');
		}
		$scope.save();
	};

	// settings zoom function
	/*$scope.zoom = function(zoom) {
		zoom = zoom || 1;
		$scope.settings.zoom = zoom;
		//document.body.style.zoom = $scope.settings.zoom;
		//document.body.style.MozTransform = 'scale(' + ($scope.settings.zoom / 100) + ')';
		document.body.style['font-size'] = ($scope.settings.zoom * 100) +'%';
		$scope.save();
	};*/

	$rootScope.$watch($rootScope, function() {
		$scope.init();
	});

	return $scope; // important
}]);
