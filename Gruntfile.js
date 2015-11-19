module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js'],
      options: {
        ignores: ['client/lib/**/*']
      }
    },

    // Injects all bower dependencies into index.html
    // Injects between <!-- bower:css / js --><!-- endbower -->
    wiredep: {
      task :{
        src: ['client/index.html']
      }
    },

    // Remove all files from the dist folder
    clean: ['client/dist/**/*'],

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        files: {
          // Concat all js files in client
          'client/dist/scripts/app.js': ['client/app/**/*.js'],
        }
      }
    },

    uglify: {
      dist: {
        files: {
          // Minify concatenated files
          'client/dist/scripts/app.min.js': ['client/dist/scripts/app.js'],
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'client/dist/styles/style.min.css': ['client/styles/**/*.css']
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['build']
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-wiredep');
  // Register Grunt Tasks

  // Runs jshint, concats and minifies js and css to dist folder. 
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'wiredep',
    'concat',
    'uglify',
    'cssmin',
  ]);

  // Grunt Task
  grunt.registerTask('default', ['build', 'watch']);

  // Register tasks for buildpack on heroku deploy
  // https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt
  // Change ENV vars: heroku config:set NODE_ENV=production

  // Development Tasks
  grunt.registerTask('heroku:development', ['build']);
  // Production Tasks
  grunt.registerTask('heroku:production', ['build']);

};
