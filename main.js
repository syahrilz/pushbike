const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const apiServer = require('./src/backend/server');

let mainWindow;
let serverInstance;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'public/icon.png')
  });

  // Start backend server
  serverInstance = apiServer.listen(3001, () => {
    console.log('API Server running on http://localhost:3001');
  });

  // Load the app
  mainWindow.loadFile('src/frontend/index.html');

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (serverInstance) {
    serverInstance.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
