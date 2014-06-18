var bg = new Layer({ width: 640, height: 1136, backgroundColor: '#456' })
var label = new Layer({ width: 640, height: 100, y: 100, backgroundColor: 'transparent' })
label.html = 'Hold Shift or tap anywhere on the background to highlight elements you can interact with.'
label.style = { fontFamily: '"Helvetica Neue", sans-serif', fontWeight: '100', textAlign: 'center', letterSpacing: '1px', lineHeight: '1.4' }

var a = new Layer({ width: 150, height: 150, x: 245, y: 250, borderRadius: '75px', backgroundColor: 'rgba(255, 255, 255, 0.1)' })
var b = new Layer({ width: 150, height: 150, x: 245, y: a.maxY + 50, borderRadius: '75px', backgroundColor: 'rgba(255, 255, 255, 0.3)' })
var c = new Layer({ width: 150, height: 150, x: 245, y: b.maxY + 50, borderRadius: '75px', backgroundColor: 'rgba(255, 255, 255, 0.5)' })
var d = new Layer({ width: 150, height: 150, x: 245, y: c.maxY + 50, borderRadius: '75px', backgroundColor: 'rgba(255, 255, 255, 0.7)' })

a.draggable.enabled = true
a.on(Events.DragStart, function() {
  a.backgroundColor = 'rgba(243, 28, 56, 0.4)'
})
a.on(Events.DragEnd, function() {
  a.backgroundColor = 'rgba(255, 255, 255, 0.1)'
})
c.on(Events.Click, function() {
  this.scale = 0.9
  this.animate({
    properties: { scale: 1 },
    curve: 'spring(200,10,10)'
  })
});
