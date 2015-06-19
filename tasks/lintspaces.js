module.exports = {
  options: {
    editorconfig: '.editorconfig'
  },
  gruntfile: {
    src: ['Gruntfile.js', 'tasks/{,*/}*.js']
  },
  lib: {
    src: ['lib/**/*.js']
  },
  test: {
    src: ['test/spec/**/*.js']
  }
};
