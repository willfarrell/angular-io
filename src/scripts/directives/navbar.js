/*
From AngularStrap, modified to not require jQuery

Remove when commited to AngularStrap

*/

angular.module('io.directives')

.directive('bsNavbar', ['$location', function($location) {
  'use strict';

  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs, controller) {
      // Watch for the $location
      scope.$watch(function() {
        return $location.path();
      }, function(newValue, oldValue) {

        var li = element[0].querySelectorAll('[data-match-route]'),
          i = li.length;
        
        while (i--) {
          var $li = angular.element(li[i]),
            // data('match-rout') does not work with dynamic attributes
            pattern = $li.attr('data-match-route'),
            regexp = new RegExp('^' + pattern + '$', ['i']);

          if(regexp.test(newValue)) {
            $li.addClass('active');
          } else {
            $li.removeClass('active');
          }
        }
      });
    }
  };
}]);