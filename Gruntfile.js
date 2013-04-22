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
		bowerrc: grunt.file.readJSON('.bowerrc'),
		jshintrc: grunt.file.readJSON('.jshintrc'),
		
		// setup
		less: {
			setup: {
				options: {
					paths: ['<%= bowerrc.directory %>/bootstrap/less/']
				},
				files: {
					'<%= yeoman.app %>/styles/bootstrap.css': '<%= bowerrc.directory %>/bootstrap/less/bootstrap.less'
				}
			}
		},
		copy: {
			setup: {
				files: [
					// testing libs
					{
						src: '<%= bowerrc.directory %>/angular/angular.js',
						dest: 'test/lib/angular.js'
					},
					{
						src: '<%= bowerrc.directory %>/angular-mocks/angular-mocks.js',
						dest: 'test/lib/angular-mocks.js'
					},
					{
						src: '<%= bowerrc.directory %>/marked/lib/marked.js',
						dest: 'test/lib/marked.js'
					},
					
					// component files
					{
						expand: true,
						flatten: true,
						src: '<%= bowerrc.directory %>/open-dyslexic/**/*.{otf,eot,woff,ttf,svg}',
						dest: '<%= yeoman.app %>/font/'
					}
					
				]
			}
		},
		
		// testing
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
				'!<%= yeoman.app %>/scripts/lib/**/*.js',
				'test/**/*.js', '!test/lib/**/*.js',
				'!**/_*'
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
	
	grunt.registerTask('setup', [
		'less:setup',
		'copy:setup'
	]);
	grunt.registerTask('update', ['setup']);
	
	grunt.registerTask('default', ['test']);
};
