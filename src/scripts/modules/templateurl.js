angular.module('io.modules')
.controller('TemplateUrlCtrl', ['io.config', '$scope', '$routeParams', function(config, $scope, $routeParams) {
	console.log('TemplateUrlCtrl (', $scope.$id, $routeParams.folder+'/'+$routeParams.page, ')');
	config.views || (config.views = 'view/');
	var views = config.views,
		page = encodeURIComponent($routeParams.page) ,
		folder = encodeURIComponent($routeParams.folder),
		parent = views,
		child = views;

	if ($routeParams.folder) {
		parent += folder;
		child = parent+'/'+page;
	} else {
		parent += page;
		child = parent+'/index';
	}

	parent += '.html';
	child += '.html';

	$scope.templateUrl = parent;
	$scope.page_url = child;
}]);
