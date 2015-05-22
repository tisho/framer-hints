# Include the hints module
{hints} = require 'framer-hints'

# Set up a few layers and events, so we can show off the hints
bg = new Layer width: Screen.width, height: Screen.height, backgroundColor: '#456'
label = new Layer width: Screen.width, height: 100, y: 100, backgroundColor: 'transparent'
label.html = 'Hold Shift or tap anywhere on the background to highlight elements you can interact with.'
label.style = fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '200', textAlign: 'center', letterSpacing: '1px', lineHeight: '1.4'

x = (Screen.width - 150)/2
a = new Layer width: 150, height: 150, x: x, y: 300, borderRadius: 75, backgroundColor: 'rgba(255, 255, 255, 0.1)'
b = new Layer width: 150, height: 150, x: x, y: a.maxY + 50, borderRadius: 75, backgroundColor: 'rgba(255, 255, 255, 0.3)'
c = new Layer width: 150, height: 150, x: x, y: b.maxY + 50, borderRadius: 75, backgroundColor: 'rgba(255, 255, 255, 0.5)'
d = new Layer width: 150, height: 150, x: x, y: c.maxY + 50, borderRadius: 75, backgroundColor: 'rgba(255, 255, 255, 0.7)'

a.draggable.enabled = true
a.draggable.momentum = false

a.on Events.DragStart, ->
  a.backgroundColor = 'rgba(243, 28, 56, 0.4)'

a.on Events.DragEnd, ->
  a.backgroundColor = 'rgba(255, 255, 255, 0.1)'

c.on Events.Click, ->
  @scale = 0.9
  @animate
    properties: { scale: 1 }
    curve: 'spring(200,10,10)'