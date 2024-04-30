# LED Matrix Programmer

Electron app and Micropython software for creating, uploading, and displaying animations on a MAX7219 8 by 8 dot matrix LED display driven by a Pi Pico W

### Demo

![Example Demo](/images/example.gif)

# How to use

The electron app's project directory is located in the `p5app` folder. 

The Micropython code for the Pico W is in the `pico` folder.

### To run:

Upload the Micropython code to the Pico using a tool like Thonny. If the proper `config.py` file is also present and contains the proper variables, the Pico should log its IP for use in the app.

To run the app:

```
cd p5app 
npm install
npm start
```

### Tips:

 - Make sure you change the SPI pins to match your wiring.

 - To access the console for development, use the keybind `ctrl-shift-i` on the application to access the developer menu.

 - `pk-appbar/pk-appbar.css` contains CSS variables for appbar colors. Try making a custom palette!
