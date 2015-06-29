module.exports = {
  options: {
    banner: '<%= banner %>'
  },
  dist: {
    src: '<%= concat.dist.dest %>',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.min.js'
  }
};
