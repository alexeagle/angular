'use strict';/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = window;
exports.window = win;
exports.document = window.document;
exports.location = window.location;
exports.gc = window['gc'] ? function () { return window['gc'](); } : function () { return null; };
exports.performance = window['performance'] ? window['performance'] : null;
exports.Event = exports.Event;
exports.MouseEvent = exports.MouseEvent;
exports.KeyboardEvent = exports.KeyboardEvent;
exports.EventTarget = exports.EventTarget;
exports.History = exports.History;
exports.Location = exports.Location;
exports.EventListener = exports.EventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9mYWNhZGUvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHLE1BQU07QUFFRCxjQUFNLE9BRko7QUFHTixnQkFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDM0IsZ0JBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQzNCLFVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBTSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFkLENBQWMsR0FBRyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQztBQUN0RCxtQkFBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2pFLGFBQUssR0FBRyxhQUFLLENBQUM7QUFDZCxrQkFBVSxHQUFHLGtCQUFVLENBQUM7QUFDeEIscUJBQWEsR0FBRyxxQkFBYSxDQUFDO0FBQzlCLG1CQUFXLEdBQUcsbUJBQVcsQ0FBQztBQUMxQixlQUFPLEdBQUcsZUFBTyxDQUFDO0FBQ2xCLGdCQUFRLEdBQUcsZ0JBQVEsQ0FBQztBQUNwQixxQkFBYSxHQUFHLHFCQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEpTIHZlcnNpb24gb2YgYnJvd3NlciBBUElzLiBUaGlzIGxpYnJhcnkgY2FuIG9ubHkgcnVuIGluIHRoZSBicm93c2VyLlxuICovXG52YXIgd2luID0gd2luZG93O1xuXG5leHBvcnQge3dpbiBhcyB3aW5kb3d9O1xuZXhwb3J0IHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbmV4cG9ydCB2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG5leHBvcnQgdmFyIGdjID0gd2luZG93WydnYyddID8gKCkgPT4gd2luZG93WydnYyddKCkgOiAoKSA9PiBudWxsO1xuZXhwb3J0IHZhciBwZXJmb3JtYW5jZSA9IHdpbmRvd1sncGVyZm9ybWFuY2UnXSA/IHdpbmRvd1sncGVyZm9ybWFuY2UnXSA6IG51bGw7XG5leHBvcnQgY29uc3QgRXZlbnQgPSBFdmVudDtcbmV4cG9ydCBjb25zdCBNb3VzZUV2ZW50ID0gTW91c2VFdmVudDtcbmV4cG9ydCBjb25zdCBLZXlib2FyZEV2ZW50ID0gS2V5Ym9hcmRFdmVudDtcbmV4cG9ydCBjb25zdCBFdmVudFRhcmdldCA9IEV2ZW50VGFyZ2V0O1xuZXhwb3J0IGNvbnN0IEhpc3RvcnkgPSBIaXN0b3J5O1xuZXhwb3J0IGNvbnN0IExvY2F0aW9uID0gTG9jYXRpb247XG5leHBvcnQgY29uc3QgRXZlbnRMaXN0ZW5lciA9IEV2ZW50TGlzdGVuZXI7XG4iXX0=