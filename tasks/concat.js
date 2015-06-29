module.exports = {
  options: {
    banner: '<%= banner %>',
    stripBanners: true
  },
  dist: {
    src: ['dist/<%= pkg.name.replace(/.js$/, "") %>.js'],
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js'
  }
};
