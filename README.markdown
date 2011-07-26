#  jQuery iframe auto height plugin

## Usage:

* include jquery in your page
* include js/jquery.iframe-auto-height.plugin.js or the latest minified version from release directory
* use the variable jQuery or its alias $ and pass a selector that matches one or more iframes

`jQuery('iframe').iframeAutoHeight();` will resize all iframes on the page

`$('iframe.photo').iframeAutoHeight();` will resize only iframes with the css class photo

`$('iframe').iframeAutoHeight({heightOffset: 20});` optionally add some buffer to the bottom (unit is pixels) 

`$('iframe').iframeAutoHeight({callback: function(callbackObject){alert(callbackObject.newFrameHeight);}});` optionally define a callback function (in this case inline) that will do something with the callbackObject.newFrameHeight value. This can for instance be used with easyXDM to alert another domain that the frame has changed height. (See http://github.com/oyvindkinsey/easyXDM.)

`$('iframe').iframeAutoHeight({debug: true})` will log some internal information to the console, if available

code can be called from within $(document).ready or after iframes are declared in markup
see index.html

## Summary:

original code by NATHAN SMITH; see [http://sonspring.com/journal/jquery-iframe-sizing](http://sonspring.com/journal/jquery-iframe-sizing)

The plugin will resize an iframe to the height of its contents

will NOT work if the iframe contains a page from another domain

When viewing code locally (file:///) Google chrome will throw errors, 
works fine in Firefox locally and should work ok in all browsers when served from the same domain. 

if you have ruby installed you can run "ruby webrick.rb" from the root of this directory
then using Google chrome go to http://localhost:3000/index.html, chrome still a little weird using localhost
ruby webrick.rb --bind YOUR_IP --port 333
seems to work better, where YOUR_IP is probably something like 192.168.0.12

with IE8 it seems better to not specify the height attribute on the iframe

so far tested on 

* IE8 on windows
* Firefox 3.6 on windows
* Chrome 6 on windows
* Firefox 3.6 on Mac


## License:

The plugin: js/jquery.iframe-auto-height.plugin.js

* [The Unlicense](http://unlicense.org) (aka: public domain) 

See specific license for any other code included, i.e. jquery 


## Changelog:
1.4.0 / 2011-07-25

* add debug option, small refactoring and minified version

1.3.0 / 2011-07-17

* fix issue on Webkit (Google Chrome & Safari) when tall iframe links to short iframe

1.2.0 / 2011-07-08 

* If the iframe document is read in quirks mode, fixed a problem with IE not applying the correct height.

1.1.0 / 2011-05-29 

* added the ability to pass in a callback function

1.0.0 / 2010-10-22 / Initial release

* converted code to plugin
* match on specified selector instead of all iframes on page

## Authors

* NATHAN SMITH (http://sonspring.com/)
* Jesse House (https://github.com/house9)
* aaron manela (https://github.com/aaronmanela)
* Hideki Abe (https://github.com/hideki-a)
* Patrick Clark (https://github.com/hellopat)

## TODO List:

* more testing

## Patches:

if you have ruby installed you might want to utilize some of these tools, 
first run `bundle` to install needed gems

webrick for testing webkit browsers, using localhost and file:/// are problematic,
instead fire up webrick use your local machines ip address and any port you want

`ruby webrick.rb --port 3333 --bind 192.168.0.5`

jslint checking

`jslint js/jquery.iframe-auto-height.plugin.js`

minify the library, first bump the version number in minify.rb then run the script, 
this will drop the new minified file into the release directory

`ruby minify.rb`


## Issues 

If you come across issues feel free to post them in the comments [here](http://house9.blogspot.com/2010/10/jquery-iframe-auto-height-plugin.html) or use the 'Issues' tab above (github)
