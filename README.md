# Framer Hints

This small script will highlight interactive elements in your prototype when you hold down `Shift`, or when you tap on an area of your prototype that isn't interactive.

[See the demo.](http://tisho.co/framer-hints/example/index.html)

![](http://tisho.co/framer-hints/framer-hints-demo.gif)

## Usage

### As a Module in Framer Studio

1. Download [framer-hints.js](http://tisho.co/framer-hints/framer-hints.js) and place it in your prototype's `modules/` directory.

2. Add this line to your code:

  ```coffeescript
  {hints} = require 'framer-hints'
  ```

3. Let the preview reload and hold down the `Shift` key. You should see elements, which respond to click/touch/draggable events get highlighted.

### As a Standalone Script

1. Download [framer-hints.js](http://tisho.co/framer-hints/framer-hints.js) to your prototype's directory.

2. Open your `index.html` in a text editor and link to the file using a `<script>` tag. The file should be included *after* the `framer.js` script and *before* your `app.js` script:

  ```html
  <script src="framer/framer.js"></script>

  <!-- Link to the script: -->
  <script src="framer-hints.js"></script>

  <script src="app.js"></script>
  ```

3. Load `index.html` in your browser and hold down the `Shift` key. You should see elements, which respond to click/touch/draggable events get highlighted.

## Configuration Options

You can customize the appearance and behavior of the hints by specifying options `hints.config`:

```coffeescript
{hints} = require 'framer-hints'
hints.config.color = 'orange'
hints.config.flashHintsOnUnhandledTaps = false
```

If you’re loading the script outside of Framer Studio, you can customize options in the `Framer.Hints.config` object:

```html
<!-- Link to the script: -->
<script src="framer-hints.js"></script>

<!-- Specify options: -->
<script>
Framer.Hints.config.color = 'orange';
Framer.Hints.config.flashHintsOnUnhandledTaps = false;
</script>
```

Here are all the available options:

* `enabled` `(true or false)` *Default:* true

  Specifies whether hints are enabled or not. You can change this option after your prototype has loaded, too, making it possible to turn hints on and off depending on the state of your prototype.

* `flashHintsOnUnhandledTaps` `(true or false)` *Default:* true

  Will flash all hints when you tap on an area of your prototype that isn't interactive.

* `triggerKeyCode` `(number)` *Default:* 16 (Shift key)

  The key code for the key that will be used to trigger the hints from your keyboard.

* `color` `(string)` *Default:* `rgba(0,150,200, 0.3)` (light blue)

  The key code for the key that will be used to trigger the hints from your keyboard.

* `style` `(object)` *Default:* `{ boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.35)' }`

  The CSS that will be applied to all hints.

## API

You can show and hide the hints from your own code by calling one of the three methods available to you:

```
Framer.Hints.show()
Framer.Hints.hide()
Framer.Hints.flash()
```
