/*jslint white: true, indent: 2, onevar: false, browser: true, undef: true, nomen: false, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: false, newcap: true, immed: true */
/*global window, console, jQuery, setTimeout */

/*
  Plugin: iframe autoheight jQuery Plugin
  Author and Contributors
  ========================================
  NATHAN SMITH (original code)
  Jesse House (converted to plugin)
  aaron manela (https://github.com/aaronmanela)
  Hideki Abe (https://github.com/hideki-a)
  Patrick Clark (https://github.com/hellopat)

  File: jquery.iframe-auto-height.plugin.js
  Description: when the page loads set the height of an iframe based on the height of its contents
  Remarks: original code from http://sonspring.com/journal/jquery-iframe-sizing  
  Version: 1.4.1 - see README: http://github.com/house9/jquery-iframe-auto-height
*/
(function ($) {
  $.fn.iframeAutoHeight = function (spec) {
    
    // set default option values
    var options = $.extend({
        heightOffset: 0, 
        callback: function (newHeight) {},
        debug: false
      }, spec);
    
    // logging
    function debug(message) {
      if (options.debug && options.debug === true && window.console) {
        console.log(message);
      }
    }    
    
    debug(options);    

    // iterate over the matched elements passed to the plugin
    $(this).each(function () {

      function hasActiveX() {
        return (typeof window.ActiveXObject !== "undefined");
      }

      // isQuirksMode
      function isQuirksMode(iframe) {
        if (iframe.contentWindow.document.compatMode && hasActiveX() && 'function' === typeof window.ActiveXObject) {
          debug("IE Quirks mode");
          return true;
        }
        // else
        return false;
      }      
      
      // resizeHeight
      function resizeHeight(iframe) {
        // Set inline style to equal the body height of the iframed content plus a little
        var newHeight;
        if (isQuirksMode(iframe)) {
          newHeight = iframe.contentWindow.document.body.scrollHeight + options.heightOffset;
        } else {
          newHeight = iframe.contentWindow.document.body.offsetHeight + options.heightOffset;
        }
        debug("New Height: " + newHeight);
        iframe.style.height = newHeight + 'px';
        options.callback({newFrameHeight: newHeight});
      }
      
      debug(this);
      
      // Check if browser is Opera or Safari (Webkit really, so includes Chrome)
      if ($.browser.safari || $.browser.opera) {
        debug("browser is webkit or opera");
        
        // Start timer when loaded.
        $(this).load(function () {
          var iframe = this;
          // Reset iframe height to 0 to force new frame size to fit window properly
          iframe.style.height = '0px';                    
          var delayedResize = function () {
            resizeHeight(iframe);
          };
          setTimeout(delayedResize, 0);
        });

        // Safari and Opera need a kick-start.
        var source = $(this).attr('src');
        $(this).attr('src', '');
        $(this).attr('src', source);
      } else {
        // For other browsers.
        $(this).load(function () {
          resizeHeight(this);
        });
      } // if browser
             
    }); // $(this).each(function () {    
  }; // $.fn.iframeAutoHeight = function (options) {
}(jQuery)); // (function ($) {