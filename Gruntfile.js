module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'client/**/*.js', 'server/**/*.js'],
      options: {
        // Ignore any global vars, jquery etc.
        globals: {
          
        }
      }
    },

    // Remove all files from the dist folder
    clean :['dist/**/*'],

    concat: {
      options: {
        separator: ';'
      },
      dist: { 
        files: {
          // Concat all js files in client
          'dist/scripts/app.js': ['client/**/*.js'],
        }
      }
    },

    uglify: {
      dist: {
        files: {
          // Minify concatenated files
          'dist/scripts/app.min.js': ['dist/scripts/app.js'],
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'dist/styles/style.min.css': ['client/**/*.css']
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Register Grunt Tasks
  
  // Runs jshint, concats and minifies js and css to dist folder. 
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'concat',
    'uglify',
    'cssmin',
  ]);

  grunt.registerTask('default', ['build', 'watch']);

};
