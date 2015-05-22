require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"framer-hints":[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var config, createHintForLayer, createHints, defaults, destroyHints, eventsToWatchFor, flashHints, hideHints, hints, shouldHintLayer, showHints;

  defaults = {
    enabled: true,
    triggerKeyCode: 16,
    flashHintsOnUnhandledTaps: true,
    color: 'rgba(0,150,200, 0.3)',
    style: {
      boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.35)'
    }
  };

  config = _.extend(defaults, window.FramerHintsConfig || {});

  hints = [];

  eventsToWatchFor = [Events.Click, Events.TouchStart, Events.TouchEnd, Events.TouchMove, Events.DragStart, Events.DragMove, Events.DragMove, Events.MouseOver, Events.MouseOut];

  createHintForLayer = function(layer) {
    var hintLayer;
    hintLayer = new Layer({
      frame: layer.screenFrame,
      scale: layer.scale * 0.85,
      backgroundColor: config.color,
      opacity: 0
    });
    hintLayer.layer = layer;
    hintLayer.style = config.style;
    hintLayer.ignoreEvents = true;
    return hintLayer;
  };

  shouldHintLayer = function(layer) {
    var keys;
    if (!(layer.visible && layer._eventListeners)) {
      return false;
    }
    keys = Object.keys(layer._eventListeners);
    return _.any(keys, (function(k) {
      return layer._eventListeners[k].length > 0 && _.contains(eventsToWatchFor, k);
    }));
  };

  createHints = function() {
    var layer;
    destroyHints();
    return hints = (function() {
      var _i, _len, _ref, _results;
      _ref = Framer.CurrentContext.getLayers();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        layer = _ref[_i];
        if (shouldHintLayer(layer)) {
          _results.push(createHintForLayer(layer));
        }
      }
      return _results;
    })();
  };

  showHints = function() {
    if (!config.enabled) {
      return;
    }
    createHints();
    return hints.forEach(function(hint) {
      return hint.animate({
        properties: {
          opacity: 1,
          scale: hint.layer.scale
        },
        curve: 'spring(200,30,20)'
      });
    });
  };

  flashHints = function() {
    createHints();
    return hints.forEach(function(hint) {
      hint.scale = hint.layer.scale;
      hint.animate({
        properties: {
          opacity: 1
        },
        curve: 'linear',
        time: 0.2
      });
      return hint.once('end', function() {
        hint.animate({
          properties: {
            opacity: 0,
            scale: hint.layer.scale * 0.95
          },
          curve: 'cubic-bezier',
          curveOptions: {
            time: 0.35
          }
        });
        return hint.once('end', function() {
          return hint.destroy();
        });
      });
    });
  };

  destroyHints = function() {
    var hint, _i, _len;
    for (_i = 0, _len = hints.length; _i < _len; _i++) {
      hint = hints[_i];
      hint.destroy();
    }
    return hints = [];
  };

  hideHints = destroyHints;

  document.addEventListener('keydown', function(event) {
    if (event.which === config.triggerKeyCode) {
      return showHints();
    }
  });

  document.addEventListener('keyup', function(event) {
    return hideHints();
  });

  document.addEventListener(Events.TouchEnd, function(event) {
    var layer, point, scale, xOffset, yOffset, _i, _len, _ref, _ref1;
    if (!config.flashHintsOnUnhandledTaps) {
      return;
    }
    event = Events.touchEvent(event);
    scale = ((_ref = Framer.Device) != null ? _ref.phone.scale : void 0) || 1;
    xOffset = (Canvas.size.width - Screen.size.width * scale) / 2;
    yOffset = (Canvas.size.height - Screen.size.height * scale) / 2;
    point = {
      x: (event.clientX + window.pageXOffset - xOffset) / scale,
      y: (event.clientY + window.pageYOffset - yOffset) / scale
    };
    _ref1 = Framer.CurrentContext.getLayers();
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      layer = _ref1[_i];
      if (shouldHintLayer(layer)) {
        if (Utils.pointInFrame(point, layer.screenFrame)) {
          return;
        }
      }
    }
    return flashHints();
  });

  Framer.Hints = {
    show: showHints,
    hide: hideHints,
    flash: flashHints,
    config: config
  };

  if (typeof exports !== "undefined" && exports !== null) {
    exports.hints = Framer.Hints;
  }

}).call(this);

},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aXNoby9Db2RlL2ZyYW1lci1oaW50cy9GcmFtZXJIaW50c0V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZnJhbWVyLWhpbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjcuMVxuKGZ1bmN0aW9uKCkge1xuICB2YXIgY29uZmlnLCBjcmVhdGVIaW50Rm9yTGF5ZXIsIGNyZWF0ZUhpbnRzLCBkZWZhdWx0cywgZGVzdHJveUhpbnRzLCBldmVudHNUb1dhdGNoRm9yLCBmbGFzaEhpbnRzLCBoaWRlSGludHMsIGhpbnRzLCBzaG91bGRIaW50TGF5ZXIsIHNob3dIaW50cztcblxuICBkZWZhdWx0cyA9IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHRyaWdnZXJLZXlDb2RlOiAxNixcbiAgICBmbGFzaEhpbnRzT25VbmhhbmRsZWRUYXBzOiB0cnVlLFxuICAgIGNvbG9yOiAncmdiYSgwLDE1MCwyMDAsIDAuMyknLFxuICAgIHN0eWxlOiB7XG4gICAgICBib3hTaGFkb3c6ICdpbnNldCAwIDAgMCAycHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpLCAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjM1KSdcbiAgICB9XG4gIH07XG5cbiAgY29uZmlnID0gXy5leHRlbmQoZGVmYXVsdHMsIHdpbmRvdy5GcmFtZXJIaW50c0NvbmZpZyB8fCB7fSk7XG5cbiAgaGludHMgPSBbXTtcblxuICBldmVudHNUb1dhdGNoRm9yID0gW0V2ZW50cy5DbGljaywgRXZlbnRzLlRvdWNoU3RhcnQsIEV2ZW50cy5Ub3VjaEVuZCwgRXZlbnRzLlRvdWNoTW92ZSwgRXZlbnRzLkRyYWdTdGFydCwgRXZlbnRzLkRyYWdNb3ZlLCBFdmVudHMuRHJhZ01vdmUsIEV2ZW50cy5Nb3VzZU92ZXIsIEV2ZW50cy5Nb3VzZU91dF07XG5cbiAgY3JlYXRlSGludEZvckxheWVyID0gZnVuY3Rpb24obGF5ZXIpIHtcbiAgICB2YXIgaGludExheWVyO1xuICAgIGhpbnRMYXllciA9IG5ldyBMYXllcih7XG4gICAgICBmcmFtZTogbGF5ZXIuc2NyZWVuRnJhbWUsXG4gICAgICBzY2FsZTogbGF5ZXIuc2NhbGUgKiAwLjg1LFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBjb25maWcuY29sb3IsXG4gICAgICBvcGFjaXR5OiAwXG4gICAgfSk7XG4gICAgaGludExheWVyLmxheWVyID0gbGF5ZXI7XG4gICAgaGludExheWVyLnN0eWxlID0gY29uZmlnLnN0eWxlO1xuICAgIGhpbnRMYXllci5pZ25vcmVFdmVudHMgPSB0cnVlO1xuICAgIHJldHVybiBoaW50TGF5ZXI7XG4gIH07XG5cbiAgc2hvdWxkSGludExheWVyID0gZnVuY3Rpb24obGF5ZXIpIHtcbiAgICB2YXIga2V5cztcbiAgICBpZiAoIShsYXllci52aXNpYmxlICYmIGxheWVyLl9ldmVudExpc3RlbmVycykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAga2V5cyA9IE9iamVjdC5rZXlzKGxheWVyLl9ldmVudExpc3RlbmVycyk7XG4gICAgcmV0dXJuIF8uYW55KGtleXMsIChmdW5jdGlvbihrKSB7XG4gICAgICByZXR1cm4gbGF5ZXIuX2V2ZW50TGlzdGVuZXJzW2tdLmxlbmd0aCA+IDAgJiYgXy5jb250YWlucyhldmVudHNUb1dhdGNoRm9yLCBrKTtcbiAgICB9KSk7XG4gIH07XG5cbiAgY3JlYXRlSGludHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGF5ZXI7XG4gICAgZGVzdHJveUhpbnRzKCk7XG4gICAgcmV0dXJuIGhpbnRzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9pLCBfbGVuLCBfcmVmLCBfcmVzdWx0cztcbiAgICAgIF9yZWYgPSBGcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKCk7XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGxheWVyID0gX3JlZltfaV07XG4gICAgICAgIGlmIChzaG91bGRIaW50TGF5ZXIobGF5ZXIpKSB7XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChjcmVhdGVIaW50Rm9yTGF5ZXIobGF5ZXIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH0pKCk7XG4gIH07XG5cbiAgc2hvd0hpbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFjb25maWcuZW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjcmVhdGVIaW50cygpO1xuICAgIHJldHVybiBoaW50cy5mb3JFYWNoKGZ1bmN0aW9uKGhpbnQpIHtcbiAgICAgIHJldHVybiBoaW50LmFuaW1hdGUoe1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBzY2FsZTogaGludC5sYXllci5zY2FsZVxuICAgICAgICB9LFxuICAgICAgICBjdXJ2ZTogJ3NwcmluZygyMDAsMzAsMjApJ1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZmxhc2hIaW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIGNyZWF0ZUhpbnRzKCk7XG4gICAgcmV0dXJuIGhpbnRzLmZvckVhY2goZnVuY3Rpb24oaGludCkge1xuICAgICAgaGludC5zY2FsZSA9IGhpbnQubGF5ZXIuc2NhbGU7XG4gICAgICBoaW50LmFuaW1hdGUoe1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9LFxuICAgICAgICBjdXJ2ZTogJ2xpbmVhcicsXG4gICAgICAgIHRpbWU6IDAuMlxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGludC5vbmNlKCdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaGludC5hbmltYXRlKHtcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgc2NhbGU6IGhpbnQubGF5ZXIuc2NhbGUgKiAwLjk1XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdXJ2ZTogJ2N1YmljLWJlemllcicsXG4gICAgICAgICAgY3VydmVPcHRpb25zOiB7XG4gICAgICAgICAgICB0aW1lOiAwLjM1XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhpbnQub25jZSgnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGhpbnQuZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGRlc3Ryb3lIaW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoaW50LCBfaSwgX2xlbjtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGhpbnRzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBoaW50ID0gaGludHNbX2ldO1xuICAgICAgaGludC5kZXN0cm95KCk7XG4gICAgfVxuICAgIHJldHVybiBoaW50cyA9IFtdO1xuICB9O1xuXG4gIGhpZGVIaW50cyA9IGRlc3Ryb3lIaW50cztcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQud2hpY2ggPT09IGNvbmZpZy50cmlnZ2VyS2V5Q29kZSkge1xuICAgICAgcmV0dXJuIHNob3dIaW50cygpO1xuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgIHJldHVybiBoaWRlSGludHMoKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihFdmVudHMuVG91Y2hFbmQsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGxheWVyLCBwb2ludCwgc2NhbGUsIHhPZmZzZXQsIHlPZmZzZXQsIF9pLCBfbGVuLCBfcmVmLCBfcmVmMTtcbiAgICBpZiAoIWNvbmZpZy5mbGFzaEhpbnRzT25VbmhhbmRsZWRUYXBzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50ID0gRXZlbnRzLnRvdWNoRXZlbnQoZXZlbnQpO1xuICAgIHNjYWxlID0gKChfcmVmID0gRnJhbWVyLkRldmljZSkgIT0gbnVsbCA/IF9yZWYucGhvbmUuc2NhbGUgOiB2b2lkIDApIHx8IDE7XG4gICAgeE9mZnNldCA9IChDYW52YXMuc2l6ZS53aWR0aCAtIFNjcmVlbi5zaXplLndpZHRoICogc2NhbGUpIC8gMjtcbiAgICB5T2Zmc2V0ID0gKENhbnZhcy5zaXplLmhlaWdodCAtIFNjcmVlbi5zaXplLmhlaWdodCAqIHNjYWxlKSAvIDI7XG4gICAgcG9pbnQgPSB7XG4gICAgICB4OiAoZXZlbnQuY2xpZW50WCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIHhPZmZzZXQpIC8gc2NhbGUsXG4gICAgICB5OiAoZXZlbnQuY2xpZW50WSArIHdpbmRvdy5wYWdlWU9mZnNldCAtIHlPZmZzZXQpIC8gc2NhbGVcbiAgICB9O1xuICAgIF9yZWYxID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIGxheWVyID0gX3JlZjFbX2ldO1xuICAgICAgaWYgKHNob3VsZEhpbnRMYXllcihsYXllcikpIHtcbiAgICAgICAgaWYgKFV0aWxzLnBvaW50SW5GcmFtZShwb2ludCwgbGF5ZXIuc2NyZWVuRnJhbWUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmbGFzaEhpbnRzKCk7XG4gIH0pO1xuXG4gIEZyYW1lci5IaW50cyA9IHtcbiAgICBzaG93OiBzaG93SGludHMsXG4gICAgaGlkZTogaGlkZUhpbnRzLFxuICAgIGZsYXNoOiBmbGFzaEhpbnRzLFxuICAgIGNvbmZpZzogY29uZmlnXG4gIH07XG5cbiAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiICYmIGV4cG9ydHMgIT09IG51bGwpIHtcbiAgICBleHBvcnRzLmhpbnRzID0gRnJhbWVyLkhpbnRzO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iXX0=