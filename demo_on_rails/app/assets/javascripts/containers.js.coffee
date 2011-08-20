class Container
  # constructor: () ->
    
  index: () ->
    @standardIframe()
    
  index2: () ->
    @standardIframe()
    
  # index3: () ->


  standardIframe: () ->
    jQuery ->
      $('iframe').iframeAutoHeight
        debug: true
        minHeight: 180  

# ==============================
# bind to the window
window.App ?= {}
window.App.Container = Container