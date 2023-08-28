const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
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


/// Create about window
function createAboutWindow() {

  const aboutWindow = new BrowserWindow({
    title: 'About Image Resizer',
    width: 300,
    height: 300,
  });

  if(isDev) {
    aboutWindow.webContents.openDevTools();
  }

  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));

}

app.whenReady().then(()=> {
    createMainWindow();

    // Implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow();
        }
      });

});


// Menu Template
const menu = [
  ...(process.platform !== 'darwin' ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
      }
    ]
  }] : []),
  {
    role: 'fileMenu'
  },
  ...(process.platform !== 'darwin' ? [{
    label: 'Help',
    submenu: [
      {
        label: 'About',
      }
    ]
  }] : [] )
]

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});