class Container
  # constructor: () ->

  index: () ->
    @standardIframe()

  index2: () ->
    @standardIframe()

  index6: () ->
    @standardIframe()

  index4: () ->
    jQuery ->
      $('iframe').iframeAutoHeight
        debug: true
        minHeight: 480
        animate: true

  index5: () ->
    jQuery ->
      $('#xsmall-iframe').iframeAutoHeight
        debug: true
        minHeight: 420
        resetToMinHeight: true
        heightCalculationOverrides: [
          { browser: 'mozilla', calculation: () -> return 420 },
          { browser: 'webkit', calculation: () -> return 520 },
          { browser: 'msie', calculation: () -> return 620 }
        ]
        callback: (callbackObject) -> console.debug "CallBack: height='#{callbackObject.newFrameHeight}' / iframe-id='#{jQuery(this).attr('id')}'"

      $('#small-iframe').iframeAutoHeight
        debug: true
        minHeight: 120
        callback: (callbackObject) -> console.debug "CallBack: height='#{callbackObject.newFrameHeight}' / iframe-id='#{jQuery(this).attr('id')}'"
        triggerFunctions: [
          (resizeFunction, iframe) ->
            $('#resize-clicker').click ->
              $(iframe).contents().find('body').html('') # clear content
              console.debug("clear content on small-iframe")
              resizeFunction(iframe)
        ]

      $('#medium-iframe').iframeAutoHeight
        debug: true
        callback: (callbackObject) -> console.debug "CallBack: height='#{callbackObject.newFrameHeight}' / iframe-id='#{jQuery(this).attr('id')}'"
        fireOnResize: true
        triggerFunctions: [
          (resizeFunction, iframe) ->
            $(window).resize ->
              console.debug("window resized - firing resizeHeight on iframe")
              resizeFunction(iframe)
        ]

  standardIframe: () ->
    jQuery ->
      $('iframe').iframeAutoHeight
        debug: true
        minHeight: 180
        diagnostics: true

# ==============================
# bind to the window
window.App ?= {}
window.App.Container = Container