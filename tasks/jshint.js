module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  gruntfile: {
    src: ['Gruntfile.js', 'tasks/{,*/}*.js']
  },
  src: {
    src: ['src/**/*.js']
  },
  test: {
    src: ['test/**/*.js']
  }
};
