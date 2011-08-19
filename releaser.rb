require 'rubygems'
require 'uglifier'
require './version'

puts " "
puts "Release for #{Version::JQUERY_IFRAME_AUTO_HEIGHT_VERSION}"

source_file_name = "demo_on_rails/app/assets/javascripts/src/jquery.iframe-auto-height.plugin.js"
output_file_name_minified = "release/jquery.iframe-auto-height.plugin.#{Version::JQUERY_IFRAME_AUTO_HEIGHT_VERSION}.min.js"
output_file_name_full = "release/jquery.iframe-auto-height.plugin.#{Version::JQUERY_IFRAME_AUTO_HEIGHT_VERSION}.js"

def update_content(content)
  Version::TOKENS_AND_VALUES.each { |item| content.gsub!(item[:token], item[:value]) }
  content.gsub!(Version::AUTHOR_TOKEN, Version::AUTHORS.join("\n  "))  
end

# read source file
input = File.read(source_file_name)

# ********************
# full release
update_content(input)
File.open(output_file_name_full, 'w') { |f| f.write(input) }
puts "  created #{output_file_name_full}"

# ********************
# minified, uglifier will rip out comments, so we put back some of them
minified_intro = "/*\n  #{Version::TOKENS_AND_VALUES.map {|item| item[:value]}.join("\n  ").chomp!} \n*/"
uglified = Uglifier.new({:copyright => false}).compile(input)
File.open(output_file_name_minified, 'w') { |f| f.write("#{minified_intro}\n#{uglified}; ") }
puts "  created #{output_file_name_minified}"

puts "Done"
puts " "

puts " => update README.markdown; version number and if author list has changed"
Version::AUTHORS.each do |author|
  puts author
end

puts " "
