require 'rubygems'
require 'kramdown'

input = File.read("README.markdown")
html = Kramdown::Document.new(input).to_html
File.open("_preview_README.html", 'w') { |f| f.write(html) }

puts "preview created: open _preview_README.html in browser"