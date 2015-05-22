defaults =
  enabled: true
  triggerKeyCode: 16 # shift key
  flashHintsOnUnhandledTaps: true
  color: 'rgba(0,150,200, 0.3)'
  style:
    boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.35)'

config = _.extend(defaults, window.FramerHintsConfig or {})

hints = []
eventsToWatchFor = [Events.Click, Events.TouchStart, Events.TouchEnd, Events.TouchMove, Events.DragStart, Events.DragMove, Events.DragMove, Events.MouseOver, Events.MouseOut]

createHintForLayer = (layer) ->
  hintLayer = new Layer
    frame: layer.screenFrame
    scale: layer.scale * 0.85
    backgroundColor: config.color
    opacity: 0
  hintLayer.layer = layer
  hintLayer.style = config.style
  hintLayer.ignoreEvents = true
  hintLayer

shouldHintLayer = (layer) ->
  return false unless layer.visible and layer._eventListeners

  keys = Object.keys(layer._eventListeners)
  return _.any(keys, ((k) -> layer._eventListeners[k].length > 0 and _.contains(eventsToWatchFor, k)))

createHints = ->
  destroyHints()
  hints = (createHintForLayer(layer) for layer in Framer.CurrentContext.getLayers() when shouldHintLayer(layer))

showHints = ->
  return unless config.enabled

  createHints()

  hints.forEach (hint) ->
    hint.animate
      properties:
        opacity: 1
        scale: hint.layer.scale
      curve: 'spring(200,30,20)'

flashHints = ->
  createHints()

  hints.forEach (hint) ->
    hint.scale = hint.layer.scale
    hint.animate
      properties:
        opacity: 1
      curve: 'linear'
      time: 0.2
    hint.once 'end', ->
      hint.animate
        properties:
          opacity: 0
          scale: hint.layer.scale * 0.95
        curve: 'cubic-bezier'
        curveOptions:
          time: 0.35
      hint.once 'end', -> hint.destroy()

destroyHints = ->
  hint.destroy() for hint in hints
  hints = []

hideHints = destroyHints

document.addEventListener 'keydown', (event) ->
  if event.which is config.triggerKeyCode
    showHints()

document.addEventListener 'keyup', (event) ->
  hideHints()

document.addEventListener Events.TouchEnd, (event) ->
  return unless config.flashHintsOnUnhandledTaps
  event = Events.touchEvent(event)
  scale = Framer.Device?.phone.scale || 1
  xOffset = (Canvas.size.width - Screen.size.width * scale) / 2
  yOffset = (Canvas.size.height - Screen.size.height * scale) / 2

  point =
    x: (event.clientX + window.pageXOffset - xOffset) / scale
    y: (event.clientY + window.pageYOffset - yOffset) / scale

  for layer in Framer.CurrentContext.getLayers() when shouldHintLayer(layer)
    return if Utils.pointInFrame(point, layer.screenFrame)

  flashHints()

Framer.Hints =
  show: showHints
  hide: hideHints
  flash: flashHints
  config: config

if exports?
  exports.hints = Framer.Hints
