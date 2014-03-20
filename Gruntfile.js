module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Created with MEAN stack by Wolfram Creative http://woflframcreative.com */\n'
      },
      build: {
        src: 'js/app.js',
        dest: 'js/app.js'
      }
    },
    concat: {   
        dev: {
            src: ['src/app/app.js', 'src/app/templatesProvider.js', 'src/app/router.js','src/app/**/*.js'],
            dest: 'js/app.js'
        }
    },
    less: {
        dev: {
            options: {
                paths: ["less"],
                dumpLineNumbers: 'comments'
            },
            files: {
                "css/style.css": "src/less/style.less",
                "fractional.css": "src/less/plugins/fractional.less",
            }
        },
        prod: {
            options: {
                paths: ["less"],
                cleancss: true,
                compress: true
            },
            files: {
              "css/style.css": "src/less/style.less",
              "fractional.min.css": "src/less/plugins/fractional.less", 
            }
        },
        build: {
            options: {
                paths: ["less"],
                cleancss: true,
                compress: true
            },
            files: {
              "fractional.min.css": "src/less/plugins/fractional.less", 
            }
        }

    },
    watch: {
        scripts: {
            files: ['src/**/*.js', '*.js'],
            tasks: ['concat'],
            options: {
                spawn: false,
            },
        },
        styles: {
            files: ['src/less/*.less', 'src/less/**/*.less'],
            tasks: ['less:dev', 'less:build', 'usebanner:build'],
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
    sprite: {
      icon: {
        src: 'src/img/icon/*.png',
        destImg: 'img/sprites/sprites_icon.png',
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
                src: ['css/*.css']
            }
        },
        build: {
          options: {
            position: 'top',
            banner: '/* \n' 
              + '<%= pkg.name %> - v-<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>  \n'
              + 'Fractional Grid system \n'
              + 'Created by Brian Noah brianjoshuanoah@gmail.com for J.Hilburn  \n'
              + 'Least common denominator is taken into account.  \n'
              + 'two_fourths = one_half, so two_fourths doesn\'t exist.  \n'
              + '*/',
            linebreak: true
          },
          files: {
            src: ['fractional.min.css']
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
            dest: 'views/',
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


  // Default task(s).
  grunt.registerTask('default', ['sprite','less:dev', 'less:prod', 'concat', 'uglify']);


};