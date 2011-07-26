require 'rubygems'
require 'uglifier'

JQUERY_IFRAME_AUTO_HEIGHT_VERSION = "1.4.1"

puts " "
puts "Minify for version #{JQUERY_IFRAME_AUTO_HEIGHT_VERSION}"

source_file_name = "js/jquery.iframe-auto-height.plugin.js"
output_file_name = "release/jquery.iframe-auto-height.plugin.#{JQUERY_IFRAME_AUTO_HEIGHT_VERSION}.min.js"
intro = "/*\n  Plugin: iframe autoheight jQuery Plugin #{JQUERY_IFRAME_AUTO_HEIGHT_VERSION}\n  see README: http://github.com/house9/jquery-iframe-auto-height\n*/"

input = File.read(source_file_name)
uglified = Uglifier.new({:copyright => false}).compile(input)
File.open(output_file_name, 'w') { |f| f.write("#{intro}\n#{uglified}; ") }

puts "  created #{output_file_name}"
puts "Done"
