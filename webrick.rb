#!/usr/bin/ruby
require 'rubygems'
require 'webrick'
require 'optparse'

# http://ceronio.net/2011/06/nice-web-server-script-to-server-any-directory-using-webrick/ 
options = {}
 
 
# Parse options
optparse = OptionParser.new do|opts|
    opts.banner = "Usage: websrv.rb [options]"
 
	options[:port] = 3000
	opts.on( '-p', '--port PORT', 'Port Number (default 3000)' ) do |port|
	     options[:port] = port
	end
	options[:docroot] = Dir.pwd
	opts.on( '-d', '--doc_root PATH', 'Document Root (default current dir)' ) do |docroot|
		puts docroot
	     options[:docroot] = docroot
	end
	options[:bind] = "localhost"
	opts.on( '-b', '--bind HOST', 'Address to bind to (default localhost)' ) do |bind|
	     options[:bind] = bind
	end	
	opts.on( '-h', '--help', 'Display this screen' ) do
	  puts opts
	  exit
	end
 
end
optparse.parse!
 
# Initialize and start WEBrick
server = WEBrick::HTTPServer.new(
	:BindAddress => options[:bind], 
	:Port => options[:port], 
	:DocumentRoot => options[:docroot] )
trap "INT" do server.shutdown end
server.start