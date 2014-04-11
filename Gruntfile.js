'use strict';

var request = require('request');

module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	var reloadPort = 35729, files;

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		develop: {
			server: {
				file: 'app.js'
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: [
				{ src: 'public/components/bootstrap/less/bootstrap.less', dest: "public/components/bootstrap/dist/css//bootstrap.min.css"},
				{ src: 'public/less/app.less', dest: 'public/css/app.css'}
				]
			}
		},
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
			},
			all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
		},
		express: {
			options: {
				port: process.env.PORT || 3000
			},
			dev: {
				options: {
					script: 'app.js',
					debug: true
				}
			},
			prod: {
				options: {
					script: 'app.js',
					node_env: 'production'
				}
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= express.options.port %>'
			}
		},
		watch: {
			options: {
				nospawn: true,
				livereload: reloadPort
			},
			styles: {
				// Which files to watch (all .less files recursively in the less directory)
				files: ['public/less/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			},
			js: {
				files: [
				'app.js',
				'app/**/*.js',
				'config/*.js'
				],
				tasks: ['develop', 'delayed-livereload','newer:jshint:all','less']
			},
			css: {
				files: ['public/styles/*.css'],
				options: {
					livereload: reloadPort
				}
			},
			jade: {
				files: ['app/views/**/*.jade'],
				options: { livereload: reloadPort }
			}
		}
	});

grunt.config.requires('watch.js.files');
files = grunt.config('watch.js.files');
files = grunt.file.expand(files);

grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
	var done = this.async();
	setTimeout(function () {
		request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
			var reloaded = !err && res.statusCode === 200;
			if (reloaded){
				grunt.log.ok('Delayed live reload successful.');
			}
			else{
				grunt.log.error('Unable to make a delayed live reload.');
			}
			done(reloaded);
		});
	}, 500);
});

grunt.loadNpmTasks('grunt-contrib-less');
grunt.registerTask('default', ['develop','less','open:server', 'watch']);
};
