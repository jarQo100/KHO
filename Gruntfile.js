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
        //             base: './public/dist',
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
        //         bases: './public/dist'
        //       }
        //     }
        //   }
        babel: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/src/',
                    src: ['**/*.js'],
                    dest: 'public/dist/'
                }]
            }
        },
        less: {
          production: {
            options: {
              sourceMap: true
            },
            files: {
              'public/dist/css/styles.min.css': 'public/less/style.less'
            },
         }
        },

        watch: {
            options:{livereload:true},
            css: {
                files: ['public/less/*.less'],
                tasks: ['less'],

            },
            js: {
                files: ['public/src/**/*.js'],
                tasks: ['copy:js'],

            },
            html: {
                files: ['public/src/**/**/*.html', 'public/index.html', 'public/pages/**/*.html'],
                tasks: ['clean:watch', 'copy:html'],

            },
            resources: {
                files: ['public/resources/**/*', '!public/resources/flags'],
                tasks: ['copy:resources']
            },
            flags: {
                files: ['public/resources/flags/**/*'],
                tasks: ['sprite:flags']
            },
        },
        sprite: {
            flags: {
                name: 'flags',
                src: 'public/resources/flags/*.png',
                dest: 'public/dist/resources/flags.png',
                destCss: 'public/dist/css/flags.css',
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
                             'bootstrap/dist/js/bootstrap.min.js',
                             'angular-cookies/angular-cookies.min.js',
                             'angular-md5/angular-md5.min.js',
                             'angular-locale/pl_pl.js',
                             'angular-permission/dist/angular-permission-ng.min.js',
                             'chart.js/dist/Chart.min.js',
                             'angular-chart.js/dist/angular-chart.min.js',
                             'angular-filter/dist/angular-filter.min.js',
                             'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
                             'angular-datetime-input/dist/datetime.js',
                             'ng-file-upload/dist/ng-file-upload.min.js'
                        ],
                        dest: 'public/dist/node_modules/'
                    }
                ]
            },

            resources: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/resources',
                        src: ['**/*', '!flags'],
                        dest: 'public/dist/resources'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/',
                        src: ['**/*.html', '!public/dist/'],
                        dest: 'public/dist'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/src/',
                        src: ['**/*.js'],
                        dest: 'public/dist/'
                    }
                ]
            }
        },
        clean: {
            watch: ['public/dist/**/*.html'],
            build: ['public/dist']
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
                cwd: 'public/src/',
                ext: '.html',
                src: '**/*.html',
                dest: 'public/src/'
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
