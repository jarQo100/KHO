module.exports = function (grunt) {

    require("load-grunt-tasks")(grunt);

    var path = require('path');
    var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

    var folderMount = function folderMount(connect, point) {
      return connect.static(path.resolve(point));
    };


    grunt.initConfig({

        // connect: {
        //     server: {
        //         options: {
        //             port: 9001,
        //             base: './app/dist',
        //             middleware: function (connect, options, defaultMiddleware) {
        //                 var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
        //                 return [
        //                     // Include the proxy first
        //                     proxy
        //                 ].concat(defaultMiddleware);
        //             }
        //         }, proxies: [
        //             {
        //                 host: 'localhost',
        //                 context: '/kho-crm_back',
        //                 port: 8090,
        //                 https: false
        //             }
        //         ]
        //     }
        // },
        // express: {
        //     server: {
        //       options: {
        //         port: 9001,
        //         bases: './app/dist'
        //       }
        //     }
        //   }
        babel: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/src/',
                    src: ['**/*.js'],
                    dest: 'app/dist/'
                }]
            }
        },
        less: {
          production: {
            options: {
              sourceMap: true
            },
            files: {
              'app/dist/css/styles.min.css': 'app/less/style.less'
            },
         }
        },

        watch: {
            options:{livereload:true},
            css: {
                files: ['app/less/*.less'],
                tasks: ['less'],

            },
            js: {
                files: ['app/src/**/*.js'],
                tasks: ['copy:js'],

            },
            html: {
                files: ['app/src/**/**/*.html', 'app/index.html', 'app/pages/**/*.html'],
                tasks: ['clean:watch', 'copy:html'],

            },
            resources: {
                files: ['app/resources/**/*', '!app/resources/flags'],
                tasks: ['copy:resources']
            },
            flags: {
                files: ['app/resources/flags/**/*'],
                tasks: ['sprite:flags']
            },
        },
        sprite: {
            flags: {
                name: 'flags',
                src: 'app/resources/flags/*.png',
                dest: 'app/dist/resources/flags.png',
                destCss: 'app/dist/css/flags.css',
                cssVarMap: function (sprite) {
                    sprite.name = 'flag-' + sprite.name;
                }
            }
        },
        copy: {
            node_modules: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/',
                        src: [

                            'angular/angular.js',
                            'jquery/dist/jquery.js',
                            'lodash/lodash.js',
                            'restangular/dist/restangular.js',
                            'angular-translate/dist/angular-translate.js',
                            'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                            'font-awesome/css/**/*.css',
                            'font-awesome/fonts/**/*',
                            'angular-sanitize/angular-sanitize.min.js',
                            'bootstrap/dist/css/*.css',
                            'livereload-js/dist/livereload.js',
                            'angular-route/angular-route.min.js',
                            'angular-ui-router/release/angular-ui-router.min.js',
                            'ng-resource/lib/angular-resource.js',
                            'font-awesome/css/font-awesome.min.css',
                            'bootstrap/js/tooltip.js',
                             'bootstrap/dist/js/bootstrap.min.js'
                        ],
                        dest: 'app/dist/node_modules/'
                    }
                ]
            },

            resources: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/resources',
                        src: ['**/*', '!flags'],
                        dest: 'app/dist/resources'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['**/*.html', '!app/dist/'],
                        dest: 'app/dist'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/src/',
                        src: ['**/*.js'],
                        dest: 'app/dist/'
                    }
                ]
            }
        },
        clean: {
            watch: ['app/dist/**/*.html'],
            build: ['app/dist']
        },
        prettify: {
           options: {
                "indent": 4,
                  "condense": true,
                  "indent_inner_html": true,
                unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
              },
            all: {
                expand: true,
                cwd: 'app/src/',
                ext: '.html',
                src: '**/*.html',
                dest: 'app/src/'
            }
          }


    });
//'configureProxies:server', 'connect:server',

    grunt.registerTask('default', ['clean', 'build',  'watch']);
    grunt.registerTask('build', ['less', 'copy']);
    grunt.registerTask('clearHtml', ['prettify']);

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-bundles');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-prettify');



};
