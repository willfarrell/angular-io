/*globals describe:true, beforeEach:true, inject:true, it:true, expect:true */

describe('inputMask', function() {
	var $compile, $rootScope,
		html, element, scope, changeValue;

	beforeEach(module('io.filters'));
	beforeEach(module('io.directives'));
	beforeEach(inject(function($rootScope, $compile) {
		// setup
		html = '<input type="text" data-ng-model="inputValue" data-input-mask="(999) 999-9999 x999999">';
		element = angular.element(html);
		scope = $rootScope;

		// change model
		changeValue = function(val) {
			scope.inputValue = val;
			element = $compile(element)(scope);
			scope.$digest();
		};
	}));

	it('should format input', function() {
		changeValue('1234567890');
		expect(element.val()).toEqual('(123) 456-7890');

		changeValue('1234567890999');
		expect(element.val()).toEqual('(123) 456-7890 x999');
	});

});