module.exports = {
  src: {
    template: 'umd',
    indent: '  ',
    src: 'src/<%= pkg.name.replace(/.js$/, "") %>.js',
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js',
    returnExportsGlobal: 'jquery-iframe-auto-height',
    deps: {
      default: [],
      amd: [],
      cjs: [],
      global: []
    }
  }
};
