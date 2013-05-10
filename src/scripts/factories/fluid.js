/*
http://fluidapp.com/developer/
*/

angular.module('io.factories')
.factory('$fluid', ['io.config', '$window', function(config, $window) {
	// config.fluid = {};
	/*
	$window.fluid.dockBadge = "10"

	$window.fluid.addDockMenuItem("mytitle", onclickHandler)

	$window.fluid.removeDockMenuItem("mytitle")

	$window.fluid.showGrowlNotification({
		title: "title",
		description: "description",
		priority: 1,
		sticky: false,
		identifier: "foo",
		onclick: callbackFunc,
		icon: imgEl // or URL string
	})
	$window.fluid.hide() // Hide this SSB application. Available only to local Userscripts.

	$window.fluid.unhide() // Unhide this SSB application. Available only to local Userscripts.

	$window.fluid.activate() // Bring this SSB application to the front. Available only to local Userscripts.

	$window.fluid.terminate() // Quit this SSB application. Available only to local Userscripts.

	$window.fluid.include(pathStr) // Eval a local JavaScript file located at the given path. Available only to local Userscripts.

	$window.fluid.applicationPath // a string path to this SSB's .app bundle directory ("/path/to/MySSB.app/"). Available only to local Userscripts.

	$window.fluid.resourcePath // a string path to this SSB's Resources directory ("/path/to/MySSB.app/Contents/Resources/"). Available only to local Userscripts.

	$window.fluid.userscriptPath // a string path to this SSB's Userscripts ("/Users/Mandy/Library/Application\ Support/Fluid/SSB/Campfire/Userscripts") directory. Available only to local Userscripts.

	$window.fluid.beep() // sounds system beep

	$window.fluid.playSound("Basso") // plays system sound if name is valid
	*/

	return $window.fluid;
}]);
