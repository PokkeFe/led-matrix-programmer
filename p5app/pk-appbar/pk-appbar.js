const { remote, ipcRenderer } = require("electron");

function getCurrentWindow() {
  return remote.getCurrentWindow();
}

function openMenu(x, y) {
  ipcRenderer.send(`display-app-menu`, { x, y });
}

function minimizeWindow(browserWindow = getCurrentWindow()) {
  if (browserWindow.minimizable) {
    // browserWindow.isMinimizable() for old electron versions
    browserWindow.minimize();
  }
}

function maximizeWindow(browserWindow = getCurrentWindow()) {
  if (browserWindow.maximizable) {
    // browserWindow.isMaximizable() for old electron versions
    browserWindow.maximize();
  }
}

function unmaximizeWindow(browserWindow = getCurrentWindow()) {
  browserWindow.unmaximize();
}

function maxUnmaxWindow(browserWindow = getCurrentWindow()) {
  if (browserWindow.isMaximized()) {
    browserWindow.unmaximize();
  } else {
    browserWindow.maximize();
  }
}

function closeWindow(browserWindow = getCurrentWindow()) {
  browserWindow.close();
}

function isWindowMaximized(browserWindow = getCurrentWindow()) {
  return browserWindow.isMaximized();
}

function reloadWindow(browserWindow = getCurrentWindow()) {
  return browserWindow.reload();
}

window.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.getElementById("close-btn");
  const maxButton = document.getElementById("maximize-btn");
  const minButton = document.getElementById("minimize-btn");

  closeButton.addEventListener('click', e => {
    closeWindow();
  });

  maxButton.addEventListener('click', e => {
    maxUnmaxWindow();
  });

  minButton.addEventListener('click', e => {
    minimizeWindow();
  });
})
