'use strict';

module.exports = function(grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	// configurable paths
	var yeomanConfig = {
		app:	'src',
		dist:	'dist'
	};
	grunt.initConfig({
		yeoman: yeomanConfig,
		pkg: grunt.file.readJSON('package.json'),
		jshintrc: grunt.file.readJSON('.jshintrc'),
		
		karma: {
			options: {
				configFile: 'test/karma.conf.js',
				browsers: ['PhantomJS']
			},
			test: {
				options: {
					reporters: ['dots'],
					singleRun: true
				}
			},
			server: {
				singleRun: false
			}
		},
		
		/*clean: {
			dist: ['.tmp', '<%= yeoman.dist %>/*'],
			deploy: ['<%= yeoman.web %>', '<%= yeoman.api %>'],
			server: '.tmp'
		},*/
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/**/*.js',
					'!<%= yeoman.app %>/scripts/script.js',
					'!<%= yeoman.app %>/scripts/angular-io/plugins/browser/*.js',
					'!<%= yeoman.app %>/scripts/modernizr.js',
				'test/spec/*.js'
			]
		}
		
	});
	
	// Provides the "karma" task.
	grunt.registerMultiTask('karma', 'Starts up a karma server.', function() {
		var done = this.async();
		require('karma').server.start(this.options(), function(code) {
			done(code === 0);
		});
	});
	
	// Test tasks.
	grunt.registerTask('test', ['jshint', 'karma:test']);
	grunt.registerTask('test-server', ['karma:server']);
	
	grunt.registerTask('default', ['test']);
};
