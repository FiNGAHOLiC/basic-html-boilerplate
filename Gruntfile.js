module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			production: ['production']
		},
		copy: {
			production: {
				files: [
					{
						expand: true,
						cwd: 'development/',
						src: ['**'],
						dest: 'production/'
					}
				]
			}
		},
		compress: {
			production: {
				options: {
					archive: 'htdocs<%= grunt.template.today("yyyymmdd") %>.zip'
				},
				files: [
					{
						expand: true,
						cwd: 'production/',
						src: '**',
						dest: 'htdocs/'
					}
				]
			}
		},
		connect: {
			development: {
				options: {
					port: 8000,
					base: 'development',
					keepalive: true
				}
			},
			production: {
				options: {
					port: 8001,
					base: 'production',
					keepalive: true
				}
			}
		},
		imagemin: {
			production: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						cwd: 'production/',
						src: '**/*.{png,jpg,jpeg}',
						dest: 'production/'
					}
				]
			}
		},
		'ftp-deploy': {
			deploy: {
				auth: {
					host: '*******.heteml.jp',
					port: 21,
					authKey: 'heteml'
				},
				src: 'production',
				dest: '*******'
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('development', [
		'connect:development'
	]);

	grunt.registerTask('production', [
		'clean',
		'copy',
		'imagemin',
		'compress',
		'connect:production'
	]);

	grunt.registerTask('deploy', [
		'ftp-deploy'
	]);

};
