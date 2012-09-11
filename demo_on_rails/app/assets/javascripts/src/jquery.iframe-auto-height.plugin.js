/*jslint white: true, indent: 2, onevar: false, browser: true, undef: true, nomen: false, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: false, newcap: true, immed: true */
/*global window, console, jQuery, setTimeout */

/*
  [INSERT_PLUGIN_NAME]
  [INSERT_VERSION_NUMBER]
  Author and Contributors
  ========================================
  [INSERT_AUTHOR_LIST]

  File: jquery.iframe-auto-height.plugin.js
  Remarks: original code from http://sonspring.com/journal/jquery-iframe-sizing
  [INSERT_DESCRIPTION]
*/
(function ($) {
  $.fn.iframeAutoHeight = function (spec) {

    // set default option values
    var options = $.extend({
        heightOffset: 0,
        minHeight: 0,
        callback: function (newHeight) {},
        animate: false,
        debug: false,
        diagnostics: false, // used for development only
        resetToMinHeight: false,
        fireOnResize: false
      }, spec);

    // logging
    function debug(message) {
      if (options.debug && options.debug === true && window.console) {
        console.log(message);
      }
    }

    // not used by production code
    function showDiagnostics(iframe, calledFrom) {
      debug("Diagnostics from '" + calledFrom + "'");
      try {
        debug("  " + $(iframe, window.top.document).contents().find('body')[0].scrollHeight + " for ...find('body')[0].scrollHeight");
        debug("  " + $(iframe.contentWindow.document).height() + " for ...contentWindow.document).height()");
        debug("  " + $(iframe.contentWindow.document.body).height() + " for ...contentWindow.document.body).height()");
      } catch (ex) {
        // ie fails when called during for each, ok later on
        // probably not an issue if called in a document ready block
        debug("  unable to check in this state");
      }
      debug("End diagnostics -> results vary by browser and when diagnostics are requested");
    }

    // show all option values
    debug(options);

    // ******************************************************
    // iterate over the matched elements passed to the plugin ; return will make it chainable
    return this.each(function () {

      // for use by webkit only
      var loadCounter = 0;

      // resizeHeight
      function resizeHeight(iframe) {
        if (options.diagnostics) {
          showDiagnostics(iframe, "resizeHeight");
        }
        
        // set the iframe size to minHeight so it'll get smaller on resizes in FF and IE
        if(options.resetToMinHeight && options.resetToMinHeight === true) {
          iframe.style.height = options.minHeight + 'px';        	
        }

        // get the iframe body height and set inline style to that plus a little
        var $body = $(iframe, window.top.document).contents().find('body');
        var newHeight = options.heightOffset;
        if($.browser.mozilla) {
        	newHeight += iframe.contentDocument.documentElement.scrollHeight;
        } else {
        	newHeight += $body[0].scrollHeight + options.heightOffset;
        }
        debug(newHeight);

        if (newHeight < options.minHeight) {
          debug("new height is less than minHeight");
          newHeight = options.minHeight + options.heightOffset;
        }

        debug("New Height: " + newHeight);
        if (options.animate) {
          $(iframe).animate({height: newHeight + 'px'}, {duration: 500});
        } else {
          iframe.style.height = newHeight + 'px';
        }

        options.callback.apply($(iframe), [{newFrameHeight: newHeight}]);
      }

      // debug me
      debug(this);
      if (options.diagnostics) {
        showDiagnostics(this, "each iframe");
      }
      
      // Resize the iframe when the browser is resized
      if(options.fireOnResize && options.fireOnResize === true) {
    	  var i = this;
    	  $(window).resize(function() {
              resizeHeight(i);
          });
      }

      // Check if browser is Opera or Safari (Webkit really, so includes Chrome)
      if ($.browser.safari || $.browser.opera) {
        debug("browser is webkit or opera");

        // Start timer when loaded.
        $(this).load(function () {
          var delay = 0;
          var iframe = this;

          var delayedResize = function () {
            resizeHeight(iframe);
          };

          if (loadCounter === 0) {
            // delay the first one
            delay = 500;
          } else {
            // Reset iframe height to 0 to force new frame size to fit window properly
            // this is only an issue when going from large to small iframe, not executed on page load
            iframe.style.height = options.minHeight + 'px';
          }

          debug("load delay: " + delay);
          setTimeout(delayedResize, delay);
          loadCounter++;
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