module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        path: 'test',

        jshint: {
            src: {
                options: {
                    curly: false,
                    undef: true
                },
                files: {
                    src: ['app/js/**/*.js']
                }
            }
        },

        concat: {
            build: {
                options: {
                    separator: ';'
                },
                src: ['scripts/jquery/jquery.js' ,'scripts/angular/angular.js'],
                dest: 'dist/app.js'
            }
        },

        uglify: {
            build: {
                files: { 'dist/app.min.js': [ 'dist/app.js' ] }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'app',
                    keepalive: true,
                    open: true,
                    middleware: function (connect, options) {
                        return [
                            require('connect-livereload')({ port: 35729 }),
                            // Serve static files.
                            connect.static(options.base)
                        ];
                    },
                    livereload: 35729
                }
            }

        },

        template : require('grunt-template-jasmine-istanbul'),
        templateOptions: {
            coverage: 'reports/coverage.json',
            report: 'reports/coverage'
        },

        watch: {
            scripts: {
                files: '<%= path %>/**/*.js',
                tasks: ['jasmine']
            }
        },

        jasmine: {
            pivotal: {
                src: 'app/js/**/*.js',
                options: {
                    specs: '<%= path %>/unit/*Spec.js',
                    helpers: '<%= path %>/spec/*Helper.js'
                }
            }
        }
    });

    // Load task modules.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task.
    grunt.registerTask('default', 'jshint');
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('server', ['connect', 'watch']);
    grunt.registerTask('test', 'watch');

};