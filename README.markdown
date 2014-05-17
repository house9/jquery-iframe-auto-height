#  jQuery iframe auto height plugin

## Alternatives:

You may want to consider one of these alternative solutions for your iframe resizing needs?

* Iframe-resizer
  * [http://davidjbradshaw.github.io/iframe-resizer/](http://davidjbradshaw.github.io/iframe-resizer/)
  * jQuery pluggin for cross domain sizing iframes to content with support for window resizing
* easyXDM
  * [http://easyxdm.net/wp/2010/03/17/resize-iframe-based-on-content/](http://easyxdm.net/wp/2010/03/17/resize-iframe-based-on-content/)
  * Resize iframe based on content
* jQuery resize plugin
  * [http://benalman.com/projects/jquery-resize-plugin/](http://benalman.com/projects/jquery-resize-plugin/)

## ATTENTION

This plugin will NOT work if the iframe contains a page from another domain, use one of the alternate libraries above if you need cross domain resize.

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

### Note

* jQuery 1.9.0 and up: you must add the $.browser plugin feature - [https://raw.github.com/house9/jquery-iframe-auto-height/master/release/jquery.browser.js](https://raw.github.com/house9/jquery-iframe-auto-height/master/release/jquery.browser.js)
  * download and include after the jquery plugin and before the iframe plugin
* 1.7.1 and below: you can also install using jamjs - [http://jamjs.org/packages/#/details/jquery-iframe-auto-height](http://jamjs.org/packages/#/details/jquery-iframe-auto-height)

### Options

* callback: function
  * Default empty function
  * Optionally define a callback function (in this case inline) that will do something with the callbackObject.newFrameHeight value. This can for instance be used with easyXDM to alert another domain that the frame has changed height.
  * Example: `$('iframe').iframeAutoHeight({callback: function(callbackObject) { alert(callbackObject.newFrameHeight);} });`
  * you can also access the current iframe jquery wrapper object use the `this` keyword
  * for example: `callback: function(callbackObject) { alert(callbackObject.newFrameHeight + " and the iframe href is:" + $(this).attr('src')); } `
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
* animate: boolean
  * Default is false
  * Uses [jquery animate](http://api.jquery.com/animate/) with duration of 500 when resizing the iframe
  * Example: `$('iframe').iframeAutoHeight({animate: true});`
* resetToMinHeight: boolean
  * Default is false
  * hard set the iframe height to the minHeight before re-sizing
* triggerFunctions: Array of functions
  * Default is an empty array
  * Optionally define 1 or more functions that will have access to the resize method
  * can be used to resize the iframe from external events such as click or window resize - see examples below
* heightCalculationOverrides: Array of 2 element arrays
  * Default is an empty array
  * Optionally re-define the height calculation method(s)
  * override the default implementation or just override specific browsers
  * Example: `$('iframe').iframeAutoHeight({strategyOverrides: [{ browser: 'mozilla', calculation: function () { return 2000; }}]);`
  * The `browser` key should be one of 'webkit', 'mozilla', 'msie', 'opera' or 'default', see [http://api.jquery.com/jQuery.browser/](http://api.jquery.com/jQuery.browser/)
  * The `calculation` key should be a function, usually with the signature `(iframe, $iframeBody, options, browser)`
  * see more examples below

## Examples:

### triggerFunctions
```
// fire iframe resize when window is resized
var windowResizeFunction = function (resizeFunction, iframe) {
  $(window).resize(function () {
    console.debug("window resized - firing resizeHeight on iframe");
    resizeFunction(iframe);
  });
};

// fire iframe resize when a link is clicked
var clickFunction = function (resizeFunction, iframe) {
  $('a').click(function () {
    $(iframe).contents().find('body').html(''); // clear content of iframe
    console.debug("link clicked - firing resizeHeight on iframe");
    resizeFunction(iframe);
  });
};

$('iframe').iframeAutoHeight({
  debug: true,
  triggerFunctions: [
    windowResizeFunction,
    clickFunction
  ]
});

```

### heightCalculationOverrides
```
// override all browser calculations using default
$('iframe').iframeAutoHeight({
  debug: true,
  heightCalculationOverrides: [{
    browser: 'default',
    calculation: function (iframe, $iframeBody, options, browser) {
      return 1000;
    }
  }]
});

// mozilla seems to be problematic for some
// this is the usual work around, but it breaks demo pages so not used in plugin
$('iframe').iframeAutoHeight({
  debug: true,
  heightCalculationOverrides: [{
    browser: 'mozilla',
    calculation: function (iframe, $iframeBody, options, browser) {
      // since the jquery browser is passed in you can also check specific versions if desired
      return iframe.contentDocument.documentElement.scrollHeight + options.heightOffset;
    }
  }]
});
```

## Summary:

original code by NATHAN SMITH; see [http://sonspring.com/journal/jquery-iframe-sizing](http://sonspring.com/journal/jquery-iframe-sizing)

The plugin will resize an iframe to the height of its contents

Will NOT work if the iframe contains a page from another domain

When viewing code locally, i.e. file:///, Google chrome will throw security errors;
Works fine in Firefox locally and should work ok in all browsers when served from the same domain.

All testing is done manually:

1.6.0 and 1.7.0 have not been officially tested, but the changes were minor
1.8.0 has had minor testing

* IE6 on windows XP (1.4.1, 1.5.0)
* IE8 on windows XP (1.4.1, 1.5.0)
* IE9 on windows Vista/W7 (1.4.1, 1.5.0)
* Firefox 5 on windows XP (1.4.1, 1.5.0)
* Firefox 6 on W7 (1.5.0)
* Chrome 13 on windows XP (1.4.1, 1.5.0)
* Firefox 5.1 on Mac (1.4.1, 1.5.0)
* Firefox 6.0 on Mac (1.5.0)
* Firefox 15.1 on Mac (1.8.0)
* Chrome 13 on Mac (1.4.1, 1.5.0)
* Chrome 21 on Mac (1.8.0)
* Safari 5 on Mac (1.4.1, 1.5.0)
* Opera 11.5 on Mac (1.4.1)
* Firefox 4 on Ubuntu 11.04 (1.4.1)
* Chrome 11 on Ubuntu 11.04 (1.4.1)

## License:

The plugin: release/jquery.iframe-auto-height.plugin.js

* [The Unlicense](http://unlicense.org) (aka: public domain)

See specific license for any other code included, i.e. jquery


## Changelog:
1.9.5 / 2014-05-17

* Update the way that the initial resize happens
 * load event may never trigger if content is already loaded

1.9.4 / 2014-05-14

* maxHeight option

1.9.3 / 2013-06-01

* the url was bad - doh!

1.9.2 / 2013-06-01

* update url for jquery browser plugin, original repo was removed from github
* jslint fixes

1.9.1 / 2013-02-02

* Add js alert warning if using jquery 1.9 and up, `$.browser` is needed

1.9.0 / 2012-11-11

* use the `$.browser.webkit` in-place of `$.browser.safari`, requires jquery 1.4 and up

1.8.0 / 2012-09-22

* new option - resetToMinHeight
* new option - triggerFunctions
* new option - heightCalculationOverrides

1.7.1 / 2012-06-02

* webkit browsers, don't set iframe.style.height to 0px on initial page load

1.7.0 / 2012-06-02

* adds the animate option

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
* yiqing-95 (https://github.com/yiqing-95)
* jcaspian (https://github.com/jcaspian)
* adamjgray (https://github.com/adamjgray)
* Jens Bissinger (https://github.com/dpree)
* jbreton (https://github.com/jbreton)
* mindmelting (https://github.com/mindmelting)

## TODO List:

* create a bower package
* publish demo site to heroku
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





