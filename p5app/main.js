const {app, BrowserWindow} = require('electron');
const path = require("path");

const er = require('electron-reload');
if(er) er(__dirname);

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    minWidth: 500,
    minHeight: 500,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    },
    frame: false
  })

  win.loadFile('index.html');
}

app.whenReady()
  .then(createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate',() => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
