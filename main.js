const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = process.env.NODE_ENV !== 'development';

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000 : 800,
    height: 800,
  });

  // Open Dev tools if in dev environment
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(()=> {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow();
        }
      });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});