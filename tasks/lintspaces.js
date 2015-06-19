module.exports = {
  options: {
    editorconfig: '.editorconfig'
  },
  gruntfile: {
    src: ['Gruntfile.js', 'tasks/{,*/}*.js']
  },
  src: {
    src: ['src/**/*.js']
  },
  test: {
    src: ['test/spec/**/*.js']
  }
};
