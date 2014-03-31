module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Created with MEAN stack by Wolfram Creative http://woflframcreative.com */\n'
      },
      build: {
        src: 'www/js/app.js',
        dest: 'www/js/app.js'
      }
    },
    concat: {   
        dev: {
            src: ['src/app/app.js', 'src/app/templatesProvider.js', 'src/app/router.js','src/app/**/*.js'],
            dest: 'www/js/app.js'
        }
    },
    less: {
        dev: {
          options: {
            paths: ["less"],
            dumpLineNumbers: 'comments'
          },
          files: {
            "www/css/style.css": "src/less/style.less",
            "www/downloads/fractional.css": "src/less/plugins/fractional.less",
          }
        },
        prod: {
          options: {
            paths: ["less"],
            cleancss: true,
            compress: true
          },
          files: {
            "www/css/style.css": "src/less/style.less",
            "www/downloads/fractional.min.css": "src/less/plugins/fractional.less", 
          }
        },
        build: {
            options: {
                paths: ["less"],
                cleancss: true,
                compress: true
            },
            files: {
              "www/downloads/fractional.min.css": "src/less/plugins/fractional.less", 
            }
        }

    },

    phantomcss: {
      desktop: {
        options: {
          screenshots: 'test/visual/desktop/',
          results: 'test/results/visual/desktop',
          viewportSize: [1024, 768]
        },
        src: [
          'test/visual/**.js'
        ]
      },
      mobile: {
        options: {
          screenshots: 'test/visual/mobile/',
          results: 'results/visual/mobile',
          viewportSize: [320, 480]
        },
        src: [
          'test/visual/**.js'
        ]
      }
    },
    watch: {
        scripts: {
            files: ['src/**/*.js', '*.js'],
            tasks: ['concat', 'nodemon', 'phantomcss'],
            options: {
                spawn: false,
            },
        },
        styles: {
            files: ['src/less/*.less', 'src/less/**/*.less'],
            tasks: ['less:dev', 'less:build', 'usebanner:build', 'copy:fractional'],
            options: {
                spawn: false,
            },
        },
        sprites: {
            files: ['src/img/**/*.png'],
            tasks: ['sprite', 'less:dev']
        },
        views: {
          files: ['src/app/**/*.ng'],
          tasks: ['copy:views']
        }

    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: ['dev'],
          nodeArgs: ['--debug'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          },
          env: {
            PORT: '8181'
          },
          cwd: __dirname,
          ignore: ['node_modules/**'],
          ext: 'js,coffee',
          watch: ['server'],
          delay: 1,
          legacyWatch: true
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },
    sprite: {
      icon: {
        src: 'src/img/icon/*.png',
        destImg: 'www/img/sprites/sprites_icon.png',
        destCSS: 'src/less/sprites/icon.less',
        imgPath: '/img/sprites/sprites_icon.png',
        algorithm: 'binary-tree',
        padding: 50,
        engine: 'auto',
        cssFormat: 'css',
        cssOpts: {
          'functions': false,
          'cssClass': function (item) {
            return '.icon-' + item.name;
          }
        }
      }
    },
    usebanner: {
        all: {
            options: {
                position: 'top',
                banner: '/*! <%= pkg.name %> - v-<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                linebreak: true
            },
            files: {
                // src: ['public/css/*.css', 'public/js/scripts.min.js']
                src: ['www/css/*.css']
            }
        },
        build: {
          options: {
            position: 'top',
            banner: '/* \n' 
              + '<%= pkg.name %> - v-<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>  \n'
              + 'Fractional Grid system \n'
              + 'Created by Brian Noah brianjoshuanoah@gmail.com in partnership with Wolfram Creative  \n'
              + 'http://fractional.wolframcreative.com/  \n'
              + 'https://github.com/Wolfram-Creative/fractional  \n'
              + '*/',
            linebreak: true
          },
          files: {
            src: ['www/downloads/fractional.min.css']
          }
        }
    },
    copy: {
      views: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'src/app/**/*.ng',
            dest: 'www/views/',
          }
        ]
      },
      fractional: {
        files: [
          {
             expand: true,
            flatten: true,
            src: 'src/less/plugins/fractional.less',
            dest: 'www/downloads/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-phantomcss');
  grunt.loadNpmTasks('grunt-nodemon');


  // Default task(s).
  grunt.registerTask('default', ['sprite', 'less:dev', 'less:build', 'concat', 'usebanner', 'copy']);
  grunt.registerTask('server', ['nodemon']);
  grunt.registerTask('test', ['phantomcss']);
  grunt.registerTask('prod', ['sprite', 'less:dev', 'less:prod', 'less:build', 'concat', 'uglify', 'usebanner', 'copy']);
};