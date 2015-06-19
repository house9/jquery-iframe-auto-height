module.exports = {
  gruntfile: {
    files: '<%= jshint.gruntfile.src %>',
    tasks: [
      'jshint:gruntfile',
      'jscs:gruntfile',
      'lintspaces:gruntfile'
    ]
  },
  src: {
    files: '<%= jshint.src.src %>',
    tasks: [
      'build'
    ]
  },
  test: {
    files: '<%= jshint.test.src %>',
    tasks: [
      'jshint:test',
      'lintspaces:test'
    ]
  }
};
