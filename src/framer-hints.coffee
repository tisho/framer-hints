defaults =
  enabled: true
  triggerKeyCode: 16 # shift key
  flashHintsOnUnhandledTaps: true
  color: 'rgba(0,150,200, 0.3)'
  style:
    boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.35)'

config = _.extend(defaults, Framer.Config.hints or {})

hints = []
hintStyle = config.style
hintColor = config.color

flashHintsOnUnhandledTaps = config.flashHintsOnUnhandledTaps
hintTriggerKeyCode = config.triggerKeyCode
hintsEnabled = config.enabled

eventsToWatchFor = [Events.Click, Events.TouchStart, Events.TouchEnd, Events.TouchMove, Events.DragStart, Events.DragMove, Events.DragMove, Events.MouseOver, Events.MouseOut]

createHintForLayer = (layer) ->
	hintLayer = new Layer
		frame: layer.screenFrame()
		scale: layer.scale * 0.85
		backgroundColor: hintColor
		opacity: 0
	hintLayer.layer = layer
	hintLayer.style = hintStyle
	hintLayer.ignoreEvents = true
	hintLayer

shouldHintLayer = (layer) ->
	return false unless layer.visible

	keys = Object.keys(layer._events)
	return _.any(keys, ((k) -> layer._events[k].length > 0 and _.contains(eventsToWatchFor, k)))

createHints = ->
	destroyHints()
	hints = (createHintForLayer(layer) for layer in Layer.Layers() when shouldHintLayer(layer))

showHints = ->
	return unless hintsEnabled

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
	if event.which is hintTriggerKeyCode
		showHints()

document.addEventListener 'keyup', (event) ->
	hideHints()

document.addEventListener Events.TouchEnd, (event) ->
	return unless flashHintsOnUnhandledTaps
	event = Events.touchEvent(event)
	point = { x: event.clientX, y: event.clientY }

	for layer in Layer.Layers() when shouldHintLayer(layer)
		frame = new Frame layer.screenFrame()
		return if Utils.pointInFrame(point, frame)

	flashHints()

window.Framer.Hints =
  show: showHints
  hide: hideHints
  flash: flashHints
