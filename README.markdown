#  jQuery iframe auto height plugin

## Usage:

* include jquery in your page
* include the latest version from the [release directory](https://github.com/house9/jquery-iframe-auto-height/tree/master/release); minified or standard
* use the variable jQuery or its alias $ and pass a selector that matches one or more iframes

`jQuery('iframe').iframeAutoHeight();` will resize all iframes on the page

`$('iframe.photo').iframeAutoHeight();` will resize only iframes with the css class photo

code can be called from within $(document).ready or after iframes are declared in markup

```
<!-- with document ready, most likely in the html head -->
<script>
  $(document).ready(function () {
    $('iframe').iframeAutoHeight({debug: true});  
  });
</script>

<!-- inline, after the iframe -->
<iframe src="my_iframe.html" class="auto-height" scrolling="no" frameborder="0"></iframe>
<script>
  $('iframe.auto-height').iframeAutoHeight({minHeight: 240});
</script>
```

### Options

* callback: function
  * Default empty function 
  * Optionally define a callback function (in this case inline) that will do something with the callbackObject.newFrameHeight value. This can for instance be used with easyXDM to alert another domain that the frame has changed height. (See http://github.com/oyvindkinsey/easyXDM.)
  * Example: `$('iframe').iframeAutoHeight({callback: function(callbackObject) { alert(callbackObject.newFrameHeight);} });`
  * you can also access the current iframe jquery wrapper object use this
  * for example: 
  * `callback: function(callbackObject) { `
  * `  alert(callbackObject.newFrameHeight + " and the iframe href is:" + $(this).attr('src')); `
  * `} `
  
* debug: boolean
  * Default is false
  * Will log some internal information to the console, if available
  * Example: `$('iframe').iframeAutoHeight({debug: true})` 
* heightOffset: integer
  * Default is 0 
  * Unit is pixels
  * Optionally add some buffer to the bottom
  * Example: `$('iframe').iframeAutoHeight({heightOffset: 20});` 
* minHeight: integer
  * Default is 0 
  * Unit is pixels
  * Sets the iframe height to this value if the calculated value is less
  * Example: `$('iframe').iframeAutoHeight({minHeight: 200});` 


## Summary:

original code by NATHAN SMITH; see [http://sonspring.com/journal/jquery-iframe-sizing](http://sonspring.com/journal/jquery-iframe-sizing)

The plugin will resize an iframe to the height of its contents

Will NOT work if the iframe contains a page from another domain

When viewing code locally, i.e. file:///, Google chrome will throw security errors; 
Works fine in Firefox locally and should work ok in all browsers when served from the same domain. 

Current Version: 1.5.0

All testing is done manually:

* IE6 on windows XP (1.4.1, 1.5.0)
* IE8 on windows XP (1.4.1, 1.5.0)
* IE9 on windows Vista/W7 (1.4.1, 1.5.0)
* Firefox 5 on windows XP (1.4.1, 1.5.0)
* Firefox 6 on W7 (1.5.0)
* Chrome 13 on windows XP (1.4.1, 1.5.0)
* Firefox 5.1 on Mac (1.4.1, 1.5.0)
* Firefox 6.0 on Mac (1.5.0)
* Chrome 13 on Mac (1.4.1, 1.5.0)
* Safari 5 on Mac (1.4.1, 1.5.0)
* Opera 11.5 on Mac (1.4.1)
* Firefox 4 on Ubuntu 11.04 (1.4.1)
* Chrome 11 on Ubuntu 11.04 (1.4.1)

## License:

The plugin: js/jquery.iframe-auto-height.plugin.js

* [The Unlicense](http://unlicense.org) (aka: public domain) 

See specific license for any other code included, i.e. jquery 


## Changelog:
1.6.0 / 2012-01-07

* callback function invoking now allows access to the iframe in the callback

1.5.0 / 2011-08-18

* add minHeight option, refactoring height calculation 

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
* ChristineP2 (https://github.com/ChristineP2)
* Mmjavellana (https://github.com/Mmjavellana)

## TODO List:

* automated tests

## Patches:

The 'master' source file is located in the demo_on_rails directory [here](https://github.com/house9/jquery-iframe-auto-height/tree/master/demo_on_rails/app/assets/javascripts/src/jquery.iframe-auto-height.plugin.js)
All html files in the [demo directory](https://github.com/house9/jquery-iframe-auto-height/tree/master/demo) point to this 'master' file.
When modifying the code you can view changes in the static html files in demo or fire up the rails app in demo_on_rails.

If you have ruby installed you might want to utilize some of these tools, first run `bundle` to install needed gems

jslint checking

`jslint demo_on_rails/app/assets/javascripts/src/jquery.iframe-auto-height.plugin.js`

before the rails app was part of this project I used webrick for testing the static html files in webkit browsers, 
but using localhost and file:/// are problematic, webrick can use your local machine ip address and any port you want

`ruby webrick.rb --port 3333 --bind 192.168.0.5 --docroot .`

Building the release 

First update the version.rb file, then run the ruby command. The script will put two files in the release directory, 
one minified and one full. A small amount of search and replace takes place on the comment block for output files.

`ruby releaser.rb`

## Known Issues 

* with IE8 it seems better to not specify the height attribute on the iframe

## Issues 

If you come across issues feel free to post them using the 'Issues' tab above (github)





