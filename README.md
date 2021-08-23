# p5.js Electron Boilerplate

Kickstart development on a dynamic p5.js desktop sketch, featuring custom application bar and dynamic window-fitting canvas.

### Empty Canvas

![Plain Canvas](/images/empty-canvas.png)

### Example Sketch

![Rotating Sketch](/images/rotate.gif)

# How to use

The project directory is located in the `p5app` folder. 

### To run:
```
cd p5app 
npm install
npm start
```
The project ships with the `electron-reload` package, which automatically reloads the window on source file changes.

Simply edit `index.html` to change the app title on the application bar, and fill `p5/sketch.js` with your p5 sketch!

*Note: the sketch.js file contains starter code to fill background color and handle window resizing.*

### Tips:

 - To access the console for development, use the keybind `ctrl-shift-i` on the application to access the developer menu.

 - `pk-appbar/pk-appbar.css` contains CSS variables for appbar colors. Try making a custom palette!
