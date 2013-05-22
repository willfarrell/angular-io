describe('requireChange', function() {
	var $compile, $rootScope, $timeout,
		html, element, scope, changeValue;

	beforeEach(module('io.filters'));
	beforeEach(module('io.directives'));
	beforeEach(inject(function($rootScope, $compile, $timeout) {
		// setup
		html = '<form name="form"><input type="text" name="input" data-ng-model="formObj.field"><div class="btn" id="btn" data-require-change="{{formObj}}" data-ng-disabled="form.$invalid">Save</div></form>';
		element = angular.element(html);
		scope = $rootScope;
		scope.formObj = {field:'Start'};
		element = $compile(element)(scope);
		scope.$digest();

		// change model
		changeValue = function(val) {
			scope.$apply(function() {
				scope.formObj.field = val;
			});
			scope.$digest();
		};

	}));

	it('should change', function() {
		changeValue('Start');
		expect(scope.form.$invalid).toEqual(true);
		changeValue('Change');
		expect(scope.form.$invalid).toEqual(false);
	});

});